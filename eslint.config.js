import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,js,mts,tsx,vue}'],
    },
    {
        name: 'app/files-to-ignore',
        ignores: [
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**',
            '**/node_modules/**',
        ],
    },
    ...pluginVue.configs['flat/recommended'],
    ...vueTsEslintConfig(),
    prettierConfig,
    {
        rules: {
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                },
            ],
            'vue/multi-word-component-names': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    'newlines-between': 'always',
                },
            ],
            'import/first': 'error',
            'import/newline-after-import': 'error',
        },
    },
    {
        files: ['**/*.vue'],
        rules: {
            indent: ['error', 2], // 2 space tab for .vue
        },
    },
    {
        files: ['**/*.{ts,js,mts,tsx}'],
        rules: {
            indent: ['error', 4], // 4 space tab for others
        },
    },
];
