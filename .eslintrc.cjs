module.exports = {
    rules: {
        'prefer-destructuring': 'warn',
        'class-methods-use-this': 'off',
        'global-require': 'off',
        'func-names': 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-magic-numbers': 'off',
        'no-useless-escape': 'off',
        eqeqeq: 'off',
        'no-empty': 'off',
        'no-undef': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'import/no-dynamic-require': 'off',
        'no-restricted-syntax': 'off',
        'no-prototype-builtins': 'off',
    },
    parser: 'babel-eslint',
    env: {
        jest: true,
    },
    extends: ['prettier'],
};
