
var http    = require("http");              // http server core module
var express = require('express');
var fs = require('fs');
var serveStatic = require('serve-static');  // serve static files

var app = express();


//var key = fs.readFileSync('encryption/private.key');
//var cert = fs.readFileSync( 'encryption/primary.crt' );
//var ca = fs.readFileSync( 'encryption/intermediate.crt' );

var key = fs.readFileSync('key.pem');
var cert = fs.readFileSync( 'cert.pem' );

var options = {
  key: key,
  cert: cert,
  passphrase: 'password'
  //ca: ca
};

app.use(serveStatic('static', {'index': ['index.html']}));

var https = require('https');
https.createServer(options, app).listen(55555);   // 443

var http = require('http');
http.createServer(app).listen(10080);


//app.use(function(req, res, next) {
//    if (req.secure) {
//        next();
//    } else {
//        res.redirect('https://' + req.headers.host + req.url);
//    }
//});

