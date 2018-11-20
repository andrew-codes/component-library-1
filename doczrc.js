const pkg = require('./package.json');

export default {
  description: pkg.description,
  title: 'Component Library',
  menu: [
    {
      name: 'Getting Started',
      menu: [
        'Start Here',
        'Contributing Content',
        'Creating New Components',
        'Implementing Components',
        'Documenting Components',
      ],
    },
    {
      name: 'Layout',
    },
    {
      name: 'Data Entry',
    },
    {
      name: 'Data Display',
    },
    {
      name: 'Other Packages',
      menu: ['StyleProvider', 'StyleContainer'],
    },
  ],
  wrapper: '@versionone/style-provider/src/StyleProvider.js',
  modifyBundlerConfig: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ['main:src', 'main'],
    },
  }),
  modifyBabelRc: config => ({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: config.plugins.concat([
      [
        '@versionone/babel-plugin-react-docgen',
        {
          additionalHandlers: [
            '@versionone/theme-definition-handler',
            'react-docgen-deprecation-handler',
          ],
        },
      ],
    ]),
  }),
};
