import { appendFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { e2eImpactConfig } from '../../config/test/e2e-impact.mjs';

const normalizePath = (value) => value.replaceAll('\\', '/').replace(/^\.\//, '');

const matchesPattern = (file, pattern) => {
  const normalizedFile = normalizePath(file);
  const normalizedPattern = normalizePath(pattern);
  const escaped = normalizedPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  const expression = escaped
    .replaceAll('**', '\u0000')
    .replaceAll('*', '[^/]*')
    .replaceAll('\u0000', '.*');
  return new RegExp(`^${expression}$`).test(normalizedFile);
};

const matchesAny = (file, patterns) => patterns.some((pattern) => matchesPattern(file, pattern));

const isProductionCode = (file) =>
  /^(ui\/src\/|internal\/|config\/|supabase\/migrations\/|.*\.go$)/.test(file);

export const selectE2ETests = (changedFiles, config = e2eImpactConfig) => {
  const files = changedFiles.map(normalizePath).filter(Boolean);
  const fullSuiteReasons = files.filter((file) => matchesAny(file, config.fullSuite.paths));

  if (fullSuiteReasons.length > 0) {
    return {
      fullSuite: true,
      e2e: config.fullSuite.e2e,
      visual: config.fullSuite.visual,
      reasons: fullSuiteReasons,
    };
  }

  const e2e = new Set(config.always);
  const visual = new Set();
  const matchedFiles = new Set();

  for (const file of files) {
    if (file.startsWith('ui/tests/e2e/') && file.endsWith('.spec.ts')) {
      e2e.add(file.slice('ui/'.length));
      matchedFiles.add(file);
    }
    if (file.startsWith('ui/tests/visual/') && file.endsWith('.spec.ts')) {
      visual.add(file.slice('ui/'.length));
      matchedFiles.add(file);
    }

    for (const domain of config.domains) {
      if (!matchesAny(file, domain.paths)) continue;
      matchedFiles.add(file);
      domain.e2e?.forEach((testFile) => e2e.add(testFile));
      domain.visual?.forEach((testFile) => visual.add(testFile));
    }
  }

  const hasUnmappedProductionCode = files.some(
    (file) => isProductionCode(file) && !matchedFiles.has(file),
  );
  if (hasUnmappedProductionCode) {
    return {
      fullSuite: true,
      e2e: config.fullSuite.e2e,
      visual: config.fullSuite.visual,
      reasons: ['unmapped-production-code'],
    };
  }

  return {
    fullSuite: false,
    e2e: [
      ...config.always,
      ...[...e2e].filter((testFile) => !config.always.includes(testFile)).sort(),
    ],
    visual: [...visual].sort(),
    reasons: [],
  };
};

const readChangedFiles = (base, head) => {
  const result = spawnSync('git', ['diff', '--name-only', `${base}...${head}`], {
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(result.stderr.trim() || 'Unable to detect changed files');
  }
  return result.stdout.split(/\r?\n/).filter(Boolean);
};

const writeGitHubOutput = (selection) => {
  if (!process.env.GITHUB_OUTPUT) return;
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    [
      `full_suite=${selection.fullSuite}`,
      `e2e=${selection.e2e.join(' ')}`,
      `visual=${selection.visual.join(' ')}`,
      `reasons=${selection.reasons.join(',')}`,
    ].join('\n') + '\n',
  );
};

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectExecution) {
  const baseIndex = process.argv.indexOf('--base');
  const headIndex = process.argv.indexOf('--head');
  const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : 'origin/main';
  const head = headIndex >= 0 ? process.argv[headIndex + 1] : 'HEAD';
  const selection = selectE2ETests(readChangedFiles(base, head));
  writeGitHubOutput(selection);
  process.stdout.write(`${JSON.stringify(selection, null, 2)}\n`);
}
