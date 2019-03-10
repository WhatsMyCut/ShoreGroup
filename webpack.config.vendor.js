const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  const sharedConfig = {
    mode: isDevBuild ? "development" : "production",
    optimization: {
      minimize: ! isDevBuild,
    },
    stats: { modules: false },
    resolve: { extensions: ['.js'] },
    module: {
      rules: [
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
      ],
    },
    entry: {
      vendor: [
        'json-to-url',
        'react-paginating',
        'axios',
        './src/styles/preloader.css',
        'react-toastify/dist/ReactToastify.css',
        'react-toastify',
        'nserializejson',
        'nval-tippy',
        'nval',
        'tippy.js',
        'bootstrap3-native',
        'bootstrap-css-only/css/bootstrap.css',
        'history',
        'connected-react-router',
        'react-router',
        'react-router-dom',
        'react-helmet',
        'react',
        'react-dom',
        'react-intl',
        'react-redux',
        'redux',
        'redux-thunk',
        'custom-event-polyfill',
        'event-source-polyfill',
        '@babel/polyfill',
      ],
    },
    output: {
      publicPath: 'build/',
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"',
      }),
    ],
  };

  const clientBundleConfig = merge(sharedConfig, {
    output: { path: path.join(__dirname, 'build') },
    module: {
      rules: [
        { test: /\.css(\?|$)/, use: [MiniCssExtractPlugin.loader].concat(isDevBuild ? 'css-loader' : 'css-loader?minimize') },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "vendor.css",
      }),
      new webpack.DllPlugin({
        path: path.join(__dirname, 'build', '[name]-manifest.json'),
        name: '[name]_[hash]',
      }),
    ],
  });

  const serverBundleConfig = merge(sharedConfig, {
    target: 'node',
    resolve: { mainFields: ['main'] },
    output: {
      path: path.join(__dirname, 'src', 'dist'),
      libraryTarget: 'commonjs2',
    },
    module: {
      rules: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }],
    },
    entry: { vendor: ['react-dom/server'] },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, 'src', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]',
      }),
    ],
  });

  return [clientBundleConfig, serverBundleConfig];
};
