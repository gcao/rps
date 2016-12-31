var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:3100',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    vendor: [
      "react",
      "react-dom",
      "react-router",
      "redux",
      "react-router-redux",
      "semantic-ui-react",
      "keymaster",
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:3100/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: path.join(__dirname, 'src'),
        exclude: /drawActivations/,
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.png|jpg|gif$/,
        loader: 'file?name=[path][name].[ext]&context=src'
      },
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
};
