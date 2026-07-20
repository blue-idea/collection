export const e2eImpactConfig = {
  always: ['tests/e2e/smoke.spec.ts'],
  fullSuite: {
    e2e: ['tests/e2e'],
    visual: ['tests/visual'],
    paths: [
      '.github/workflows/**',
      'config/test/**',
      'ui/package.json',
      'ui/pnpm-lock.yaml',
      'ui/playwright.config.ts',
      'ui/vite.config.ts',
      'ui/src/App.tsx',
      'ui/src/store/**',
      'ui/src/repositories/**',
      'ui/src/domain/schemas.ts',
      'ui/src/domain/migration.ts',
      'supabase/migrations/**',
    ],
  },
  domains: [
    {
      name: 'bookmarks',
      paths: ['ui/src/features/bookmarks/**', 'ui/src/domain/commands/bookmark*.ts'],
      e2e: [
        'tests/e2e/bookmark-actions.spec.ts',
        'tests/e2e/bookmark-crud.spec.ts',
        'tests/e2e/bookmark-state.spec.ts',
      ],
    },
    {
      name: 'collections',
      paths: ['ui/src/features/collections/**', 'ui/src/domain/collections/**'],
      e2e: [
        'tests/e2e/collection-compose.spec.ts',
        'tests/e2e/collection-crud.spec.ts',
        'tests/e2e/collection-membership.spec.ts',
      ],
    },
    {
      name: 'categories',
      paths: ['ui/src/features/categories/**', 'ui/src/domain/categories/**'],
      e2e: ['tests/e2e/category-crud.spec.ts', 'tests/e2e/category-drag.spec.ts'],
    },
    {
      name: 'tags',
      paths: ['ui/src/features/tags/**', 'ui/src/domain/tags/**'],
      e2e: ['tests/e2e/tag-management.spec.ts'],
    },
    {
      name: 'views',
      paths: ['ui/src/features/views/**', 'ui/src/domain/views/**'],
      e2e: ['tests/e2e/base-views.spec.ts', 'tests/e2e/aggregate-views.spec.ts'],
      visual: ['tests/visual/main-window.spec.ts'],
    },
    {
      name: 'search',
      paths: ['ui/src/features/search/**', 'ui/src/domain/search/**', 'ui/src/components/Spotlight.tsx'],
      e2e: ['tests/e2e/spotlight.spec.ts', 'tests/e2e/semantic-search.spec.ts'],
    },
    {
      name: 'settings',
      paths: ['ui/src/features/settings/**', 'ui/src/services/settings/**', 'ui/src/components/SettingsDialog.tsx'],
      e2e: ['tests/e2e/settings-i18n.spec.ts'],
      visual: ['tests/visual/theme-skins.spec.ts'],
    },
    {
      name: 'i18n',
      paths: ['ui/src/i18n/**', 'ui/src/config/i18n.ts'],
      e2e: ['tests/e2e/ui-language-alignment.spec.ts', 'tests/e2e/settings-i18n.spec.ts'],
      visual: ['tests/visual/ui-language-alignment.spec.ts'],
    },
    {
      name: 'storage',
      paths: ['ui/src/features/storage/**', 'ui/src/services/storage/**', 'ui/src/services/storage-coordinator/**'],
      e2e: ['tests/e2e/storage-switch.spec.ts', 'tests/e2e/storage-data-root.spec.ts'],
    },
    {
      name: 'auth',
      paths: ['ui/src/features/auth/**', 'ui/src/repositories/auth.ts', 'ui/src/components/LoginScreen.tsx'],
      e2e: ['tests/e2e/auth.spec.ts', 'tests/e2e/local-startup.spec.ts'],
    },
    {
      name: 'ai',
      paths: ['ui/src/features/ai/**', 'ui/src/services/ai/**'],
      e2e: [
        'tests/e2e/ai-bookmark-analysis.spec.ts',
        'tests/e2e/ai-consent.spec.ts',
        'tests/e2e/ai-organizer.spec.ts',
        'tests/e2e/semantic-search.spec.ts',
      ],
    },
    {
      name: 'insights-health',
      paths: ['ui/src/features/insights/**', 'ui/src/features/health/**', 'internal/health/**'],
      e2e: ['tests/e2e/insights.spec.ts', 'tests/e2e/health-scan.spec.ts'],
    },
    {
      name: 'import-export',
      paths: ['ui/src/features/import-export/**'],
      e2e: ['tests/e2e/import-export.spec.ts'],
    },
    {
      name: 'categories',
      paths: ['ui/src/features/categories/**', 'ui/src/domain/categories/**'],
      e2e: ['tests/e2e/category-crud.spec.ts', 'tests/e2e/category-drag.spec.ts'],
    },
    {
      name: 'tags',
      paths: ['ui/src/features/tags/**', 'ui/src/domain/tags/**'],
      e2e: ['tests/e2e/tag-management.spec.ts'],
    },
    {
      name: 'views',
      paths: ['ui/src/features/views/**', 'ui/src/domain/views/**'],
      e2e: ['tests/e2e/base-views.spec.ts', 'tests/e2e/aggregate-views.spec.ts'],
      visual: ['tests/visual/main-window.spec.ts'],
    },
    {
      name: 'search',
      paths: ['ui/src/features/search/**', 'ui/src/domain/search/**', 'ui/src/components/Spotlight.tsx'],
      e2e: ['tests/e2e/spotlight.spec.ts', 'tests/e2e/semantic-search.spec.ts'],
    },
    {
      name: 'settings',
      paths: ['ui/src/features/settings/**', 'ui/src/services/settings/**', 'ui/src/components/SettingsDialog.tsx'],
      e2e: ['tests/e2e/settings-i18n.spec.ts'],
      visual: ['tests/visual/theme-skins.spec.ts'],
    },
    {
      name: 'i18n',
      paths: ['ui/src/i18n/**', 'ui/src/config/i18n.ts'],
      e2e: ['tests/e2e/ui-language-alignment.spec.ts', 'tests/e2e/settings-i18n.spec.ts'],
      visual: ['tests/visual/ui-language-alignment.spec.ts'],
    },
    {
      name: 'storage',
      paths: ['ui/src/features/storage/**', 'ui/src/services/storage/**', 'ui/src/services/storage-coordinator/**'],
      e2e: ['tests/e2e/storage-switch.spec.ts', 'tests/e2e/storage-data-root.spec.ts'],
    },
    {
      name: 'auth',
      paths: ['ui/src/features/auth/**', 'ui/src/repositories/auth.ts', 'ui/src/components/LoginScreen.tsx'],
      e2e: ['tests/e2e/auth.spec.ts', 'tests/e2e/local-startup.spec.ts'],
    },
    {
      name: 'ai',
      paths: ['ui/src/features/ai/**', 'ui/src/services/ai/**'],
      e2e: [
        'tests/e2e/ai-bookmark-analysis.spec.ts',
        'tests/e2e/ai-consent.spec.ts',
        'tests/e2e/ai-organizer.spec.ts',
        'tests/e2e/semantic-search.spec.ts',
      ],
    },
    {
      name: 'insights-health',
      paths: ['ui/src/features/insights/**', 'ui/src/features/health/**', 'internal/health/**'],
      e2e: ['tests/e2e/insights.spec.ts', 'tests/e2e/health-scan.spec.ts'],
    },
    {
      name: 'import-export',
      paths: ['ui/src/features/import-export/**'],
      e2e: ['tests/e2e/import-export.spec.ts'],
    },
    {
      name: 'global-styles',
      paths: ['ui/src/index.css', 'ui/src/config/themes.ts', 'ui/src/themes.ts'],
      e2e: ['tests/e2e/app-shell.spec.ts'],
      visual: ['tests/visual'],
    },
  ],
};
