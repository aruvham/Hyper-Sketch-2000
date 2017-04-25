var credentials = require(__dirname + '/credentials.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Sketch = require(__dirname + '/config.js');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/* DATABASE */

//mongoose.connect('mongodb://localhost/test');
mongoose.connect(`mongodb://${credentials.USERNAME}:${credentials.PASSWORD}@ds113841.mlab.com:13841/hyper-sketch-2000`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DataBase is now connected!');
});

/* ROUTES */

app.get('/sketch', function(req, res) {
  console.log("SERVING GET REQUEST /sketch/thumbnails");
  Sketch.find({}, function(err, data) {
    res.send(data);
    res.end();
  });
});

app.post('/sketch', function(req, res) {
  console.log("SERVING POST REQUEST /sketch/dataURL");

  console.log(req.body);
  var newSketch = new Sketch({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url || 'null',
    dataURL: req.body.dataURL,
    timestamp: req.body.timestamp
  });

  console.log('TEXT:', newSketch)

  //console.log(newSketch)

  newSketch.save(function(err, newSketch){
    if (err) {
      console.log(err);
    } else {
      console.log(`SKETCH ${newSketch._id} SAVED!`);
      res.send('SAVED');
      res.end();
    }
  });
});

app.post('/delete', function(req, res) {
  var id = req.body._id;
  Sketch.findByIdAndRemove(id, function(err) {
    if(err) console.log(err);
    else {
      console.log(`OBJECT WITH ID: ${id} DELETED`);
      res.send('SUCCESS!');
    }
  });
});

app.get('/*', function(req, res) {
  res.redirect('/');
});
