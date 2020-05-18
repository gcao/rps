// http://stackoverflow.com/a/26218192
var fs = require('fs');
var exec = require('child_process').exec;
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
app.use('/main.js', proxy(url.parse('http://localhost:3100/main.js')));
app.use('/vendor.js', proxy(url.parse('http://localhost:3100/vendor.js')));

app.get('/test', function(req, res) {
  res.write('This is a test.');
  res.end();
});

app.delete('/data/image-classifier', function(req, res) {
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
});

app.get('/data/*', function(req, res) {
  if (req.url.match(/data\/image-classifier[\/]?$/)) {
    fs.readdir('public/data/image-classifier', function(err, items) {
      res.write(JSON.stringify(items.map(function(item) {
        return 'data/image-classifier/' + item;
      })));
      res.end();
    })
  }
});

app.post('/*.json', function(req, res) {
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

app.post('/*.png', function(req, res) {
  console.log("POST " + req.url + " BEGIN");
  var file = "public/" + req.url;
  var chunks = [];

  res.on('data', function(chunk){
    console.log("POST " + req.url + " DATA");
    chunks.push(chunk);
  });

  res.on('end', function(){
    console.log("POST " + req.url + " END");
    var buffer = Buffer.concat(chunks);
    fs.writeFile(file, buffer, function(err){
      if (err) {
        console.log(err);
        res.write('{"success": false}');
        res.end();
      } else {
        res.write('{"success": true}');
        res.end();
      }
    })
  });
});

app.listen(3300);
console.log('Express Server is listening at localhost:3300');
