/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
// .eslintconfig excludes this file, but some editors still complain

const webpack = require('webpack');

const buildConfig = (env = {}, output) => {
  const IS_DEV = (env.dev === 'true');

  return {
    entry: {
      index: './src/WebIndex'
    },

    output: output,

    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      }]
    },

    plugins: (IS_DEV
      ? []
      : [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true
        })
      ])
    ,

    devtool: IS_DEV ? 'eval-source-map' : 'source-map', // 'source-map' will produce external sourcemaps

    watchOptions: {
      // instantly rebuild when a file changes
      aggregateTimeout: 0
    }
  };
};

module.exports = env => {
  return [
    buildConfig(env, {
      path: __dirname + '/lib',
      publicPath: '/',
      filename: '[name].js',

      // allow the file to be consumed with require() or import
      libraryTarget: 'commonjs2'
    }),
    buildConfig(env, {
      path: __dirname + '/lib',
      publicPath: '/',
      filename: 'vendor_[name].js',

      // allow the file to be consumed with require() or import
      library: 'stab',
      libraryTarget: 'window'
    })
  ];
};
