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
    }
  });
}

var populateResults = function(data) {
  console.log(data);
  data.forEach(function(img) {
    var html = `
    <div class='result'>
      <div class="result-image" style="background-image:url('${img.media.m}')"></div>
      <div class="result-inner">
        <h3>${img.title}</h3>
        <div class="info">
          <p><strong>AUTHOR: </strong>${img.author}</p>
          <p><strong>TAGS: </strong>${img.tags}</p>
          <p><strong>DATE TAKEN: </strong>${img.date_taken}</p>
          <button><a href="${img.link}">Open in Flickr ...</a></button>
        </div>
      </div>
    </div>
    `;
    $('.result-container').append(html);
  })
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

/* EVENTS */
