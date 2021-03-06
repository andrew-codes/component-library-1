const netlify = require('docz-plugin-netlify');
const pkg = require('./package.json');
const { version } = require('./lerna.json');

export default {
  description: pkg.description,
  title: `Component Library v${version}`,
  plugins: [netlify()],
  debug: Boolean(process.env.DEBUG),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  codeSandbox: false,
  menu: [
    {
      name: 'Getting Started',
      menu: [
        'Start Here',
        'Contributing Content',
        'Developer Guide',
        'Implement Components',
        'Document Components',
      ],
    },
    {
      name: 'Styling',
    },
    { name: 'Icons', menu: ['Icon'] },
  ],
  modifyBundlerConfig: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      mainFields: ['main:src', 'main'],
    },
  }),
  modifyBabelRc: () => ({
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
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-transform-react-fela-display-name',
      '@babel/plugin-proposal-class-properties',
      'babel-plugin-dev-expression',
      [
        '@versionone/babel-plugin-react-docgen',
        {
          additionalHandlers: [
            '@versionone/theme-definition-handler',
            'react-docgen-deprecation-handler',
          ],
        },
      ],
    ],
  }),
};
