import assert from 'node:assert/strict';
import test from 'node:test';

import { selectE2ETests } from './select-e2e-tests.mjs';

test('书签功能变更应选择冒烟与书签相关 E2E', () => {
  const result = selectE2ETests(['ui/src/features/bookmarks/visit.ts']);

  assert.equal(result.fullSuite, false);
  assert.deepEqual(result.e2e, [
    'tests/e2e/smoke.spec.ts',
    'tests/e2e/bookmark-actions.spec.ts',
    'tests/e2e/bookmark-crud.spec.ts',
    'tests/e2e/bookmark-state.spec.ts',
  ]);
});

test('多层功能目录变更仍应命中所属影响域', () => {
  const result = selectE2ETests(['ui/src/features/bookmarks/dialogs/editor.ts']);

  assert.equal(result.fullSuite, false);
  assert.ok(result.e2e.includes('tests/e2e/bookmark-crud.spec.ts'));
});

test('共享 Store 变更应升级为全量 E2E 与视觉回归', () => {
  const result = selectE2ETests(['ui/src/store/app-store.ts']);

  assert.equal(result.fullSuite, true);
  assert.deepEqual(result.e2e, ['tests/e2e']);
  assert.deepEqual(result.visual, ['tests/visual']);
});

test('仅文档变更应只保留固定冒烟测试', () => {
  const result = selectE2ETests(['docs/spec/test_strategy.md']);

  assert.equal(result.fullSuite, false);
  assert.deepEqual(result.e2e, ['tests/e2e/smoke.spec.ts']);
  assert.deepEqual(result.visual, []);
});

test('直接修改 E2E 文件时应选择该文件并保留冒烟测试', () => {
  const result = selectE2ETests(['ui/tests/e2e/collection-crud.spec.ts']);

  assert.deepEqual(result.e2e, [
    'tests/e2e/smoke.spec.ts',
    'tests/e2e/collection-crud.spec.ts',
  ]);
});

test('全局样式变更应执行全量视觉回归及主界面 E2E', () => {
  const result = selectE2ETests(['ui/src/index.css']);

  assert.equal(result.fullSuite, false);
  assert.deepEqual(result.e2e, [
    'tests/e2e/smoke.spec.ts',
    'tests/e2e/app-shell.spec.ts',
  ]);
  assert.deepEqual(result.visual, ['tests/visual']);
});

test('无法映射的生产代码变更应安全升级为全量测试', () => {
  const result = selectE2ETests(['ui/src/services/new-service.ts']);

  assert.equal(result.fullSuite, true);
  assert.deepEqual(result.reasons, ['unmapped-production-code']);
});
