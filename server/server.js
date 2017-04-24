var express = require('express');
var mongoose = require('mongoose');
var sketchSchema = require(__dirname + '/config.js');
var app = express();


app.use(express.static(__dirname + '/../public'));
app.listen('8080');
console.log('Server now listening on port 8080');

/* DATABASE */

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DataBase is now connected!');
});

/* ROUTES */
app.get('/flickr', function(req, res) {
  console.log("SERVING GET REQUEST /flikr");
  res.send("YOU MADE A GET REQUEST TO /flikr");
});

app.get('/sketch/thumbnails', function(req, res) {
  console.log("SERVING GET REQUEST /sketch/thumbnails");
  res.send("YOU MADE A GET REQUEST TO /sketch/thumbnails");
});

app.get('/sketch/dataURL', function(req, res) {
  console.log("SERVING GET REQUEST /sketch/dataURL");
  res.send("YOU MADE A GET REQUEST TO /sketch/dataURL");
});

app.post('/sketch/dataURL', function(req, res) {
  console.log("SERVING POST REQUEST /sketch/dataURL");
  res.send("YOU MADE A POST REQUEST TO /sketch/dataURL");
  
});

app.get('/*', function(req, res) {
  res.redirect('/');
});
