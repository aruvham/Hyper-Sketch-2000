/* JQUERY */

$(document).ready(function() {
  console.log("I AM READY!")
});

var fetchFromFlickr = function(query) {
  var url = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
  $.ajax({
    dataType: "json",
    url: url,
    data: {
        tags: query,
        format: "json"
      },
    success: function(data) {
      console.log('FETCH FROM FLICKR SUCCESSFUL');
      populateResults(data.items);
      // do something
    }
  });
}

var populateResults = function(data) {
  console.log(data);
  
}

/* P5 AND CANVAS */

var bgCanvas = function(p) {
  p.setup = function() {
    p.createCanvas(400, 400);
    p.background('#FFF');
  };
};

var mainCanvas = function(p) {
  p.setup = function() {
    p.createCanvas(400, 400);
    p.strokeWeight(10);
    p.stroke('#000');
    p.fill('#000');
  };
  p.draw = function() {
    if(p.mouseIsPressed) {
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }
  };
};

var bg = new p5(bgCanvas, 'canvas-container');
var main = new p5(mainCanvas, 'canvas-container');
