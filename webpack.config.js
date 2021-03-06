var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:3100',
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-router-redux',
      'semantic-ui-react',
      'keymaster',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:3100/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: path.join(__dirname, 'src'),
        exclude: /drawActivations/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'tslint',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'tsfmt-loader',
        query: {
          replace: true
        },
        include: path.join(__dirname, 'src')
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel', 'source-map-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
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
}
