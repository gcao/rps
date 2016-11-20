// http://stackoverflow.com/a/26218192
var fs = require('fs');
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
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
  },
}).listen(3100, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack Dev Server is listening at localhost:3100');
});


// --------your proxy----------------------
var app = express();

app.use('/', express.static('./public'))

// proxy the request for static assets
app.use('/static', proxy(url.parse('http://localhost:3100/static')));

app.get('/test', function(req, res) {
  res.write('This is a test.');
  res.end();
});

app.get('/data/*', function(req, res) {
  if (req.url.match(/data\/image-classifier[\/]?$/)) {
    if (req.method === 'DELETE') {
      console.log('Delete image classifier training data');
      exec("rm -f public/data/image-classifier/*.json", function (error, stdout, stderr) {
        //sys.print('stdout: ' + stdout);
        if (stderr) sys.print('stderr: ' + stderr);
        if (error) {
          console.log('Delete image classifier training data error: ' + error);
          res.write('{"success": false}');
        } else {
          res.write('{"success": true}');
        }
        res.end();
      });
    } else {
      fs.readdir('public/data/image-classifier', function(err, items) {
        res.write(JSON.stringify(items.map(function(item) {
          return 'data/image-classifier/' + item;
        })));
        res.end();
      })
    }
  }
});

app.post('/data/*', function(req, res) {
  var file = "public/" + req.url;
  fs.writeFile(file, '', function(err) {
    if (err) {
      console.log(err);
      res.write('{"success": false}');
      res.end();
    } else {
      req.on('data', function(buffer) {
        fs.appendFile(file, buffer.toString());
      });
      req.on('end', function() {
        res.write('{"success": true}');
        res.end();
      });
    }
  });
});

app.listen(3000);
console.log('Express Server is listening at localhost:3000');
