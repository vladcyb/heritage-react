module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:css-import-order/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'unused-imports',
    'import',
    'css-import-order',
  ],
  'rules': {
    'no-multi-spaces': 'error',
    'indent': [
      'error', 2, {
        SwitchCase: 1,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'varsIgnorePattern': '^_',
        'args': 'after-used',
        'argsIgnorePattern': '^_',
      },
    ],
    'linebreak-style': ['off'],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-spacing': ['error', {
      'when': 'never',
    }],
    'react/jsx-equals-spacing': [2, 'never'],
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 0,
    }],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-tag-spacing': [2, {
      'beforeSelfClosing': 'always',
      'beforeClosing': 'never',
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'sort-imports':
     [
       'error',
       {
         'ignoreCase': true,
         'ignoreDeclarationSort': true,
       },
     ],
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      'pathGroups': [
        {
          'pattern': '@/**',
          'group': 'internal',
          'position': 'after',
        },
      ],
      'newlines-between': 'always',
    }],
    'import/no-unresolved': 'error',
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
      },
    },
  },
}
