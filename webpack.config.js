const SentryWebpackPlugin = require('@sentry/webpack-plugin'),
  package = require('./package.json'),
  secrets = require('./secrets.json');

module.exports = {
  // other configuration
  configureWebpack: {
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: secrets.sentryAuthToken,
        org: 'alek-evans',
        project: 'discord-rpc',
        release: package.version,

        // webpack specific configuration
        include: '.',
        ignore: ['node_modules', 'webpack.config.js']
      })
    ]
  }
};
