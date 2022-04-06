/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withAntdLess = require('next-plugin-antd-less')
const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = withAntdLess({
  images: {
    domains: ['dev-ipfs.clueconn.com', 'ipfs.clueconn.com'],
  },
  reactStrictMode: true,
  // optional: you can modify antd less variables directly here
  modifyVars: {
    '@primary-color': '#d818ff',
    '@link-color': '#d818ff', // link color
    '@success-color': '#52c41a', // success state color
    '@warning-color': '#faad14', // warning state color
    '@error-color': '#f5222d', // error state color
  },
  // Or better still you can specify a path to a file
  lessVarsFilePath: './styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...

  webpack(config) {
    return config
  },

  // ONLY for Next.js 10, if you use Next.js 11, delete this block
  future: {
    webpack5: true,
  },
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: false, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
