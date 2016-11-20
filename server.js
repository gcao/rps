// http://stackoverflow.com/a/26218192
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(3100, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server is listening at localhost:3100');
});


// --------your proxy----------------------
var app = express();

app.use('/', express.static('.'))

// proxy the request for static assets
app.use('/static', proxy(url.parse('http://localhost:3100/static')));

app.get('/test', function(req, res) {
  res.write('This is a test.');
  res.end();
});

app.listen(3000);
console.log('Express Server is listening at localhost:3000');
