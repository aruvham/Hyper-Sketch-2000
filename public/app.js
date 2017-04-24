/* JQUERY */

$(document).ready(function() {
  console.log("I AM READY!");
  $('.main').show();
  $('.edit').hide();
  var colors = $('.colors span')
  for(var i = 0; i < colors.length; i++) {
    var hex = $(colors[i]).attr('hex');
    $(colors[i]).css("background-color", hex);
  }

  /* EVENTS */
  $('#search-flickr').on('click', function() {
    var query = $('#search-input').val();
    fetchFromFlickr(query);
  });

  $('.free-mode').on('click', function() {
    // clear canvases
    // get eraser to work
    mainCtx.strokeStyle = 'rgb(255, 255, 255)';
    main.fill('rgb(255, 255, 255)');
    mainCtx.globalCompositeOperation = 'destination-out';
    mainCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
    main.fill('rgba(255, 255, 255, 255)');
    main.rect(0, 0, 400, 400);

    bgCtx.strokeStyle = 'rgb(255, 255, 255)';
    bg.fill('rgb(255, 255, 255)');
    bgCtx.globalCompositeOperation = 'destination-out';
    bgCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
    bg.fill('rgba(255, 255, 255, 255)');
    bg.rect(0, 0, 400, 400);

    // add/remove classes
    var colors = $('.colors span')
    for(var i = 0; i < colors.length; i++) {
      var hex = $(colors[i]).attr('hex');
      $(colors[i]).removeClass("color-selected");
      if(hex === '#000000') $(colors[i]).addClass("color-selected");
    }

    // restore
    main.stroke('#000');
    mainCtx.globalCompositeOperation = 'source-over';

    bg.stroke('#FFF');
    bg.fill('#FFF');
    bgCtx.globalCompositeOperation = 'source-over';
    bg.rect(0, 0, 400, 400);

    $('.main').hide();
    $('.edit').show();
  });

  $('#back').on('click', function() {
    // clear canvases
    // get eraser to work
    mainCtx.strokeStyle = 'rgb(255, 255, 255)';
    main.fill('rgb(255, 255, 255)');
    mainCtx.globalCompositeOperation = 'destination-out';
    mainCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
    main.fill('rgba(255, 255, 255, 255)');
    main.rect(0, 0, 400, 400);

    // add/remove classes
    var colors = $('.colors span')
    for(var i = 0; i < colors.length; i++) {
      var hex = $(colors[i]).attr('hex');
      $(colors[i]).removeClass("color-selected");
      if(hex === '#000000') $(colors[i]).addClass("color-selected");
    }

    // restore
    main.stroke('#000');
    mainCtx.globalCompositeOperation = 'source-over';

    $('.edit').hide();
    $('.main').show();
  });

  $('.colors span').on('click', function() {
    // get color
    var color = $(this).attr("hex");
    console.log(`CHANGING TO ${color}`);

    // add/remove classes
    var colors = $('.colors span')
    for(var i = 0; i < colors.length; i++) {
      $(colors[i]).removeClass("color-selected");
    }
    $(this).addClass("color-selected");

    // make color work
    main.stroke(color);
  });

  $('#pencil').on('click', function() {
    console.log('CHANGING TO PENCIL');
    $('.black').addClass('color-selected');

    main.stroke('#000');
    mainCtx.globalCompositeOperation = 'source-over';
  });

  $('#eraser').on('click', function() {
    console.log('CHANGING TO ERASER');
    // add/remove classes
    var colors = $('.colors span')
    for(var i = 0; i < colors.length; i++) {
      $(colors[i]).removeClass("color-selected");
    }

    // get eraser to work
    mainCtx.strokeStyle = 'rgb(255, 255, 255)';
    mainCtx.globalCompositeOperation = 'destination-out';
    mainCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
  });

  $('#delete').on('click', function() {
    console.log('DELETING');

    // get eraser to work
    mainCtx.strokeStyle = 'rgb(255, 255, 255)';
    main.fill('rgb(255, 255, 255)');
    mainCtx.globalCompositeOperation = 'destination-out';
    mainCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
    main.fill('rgba(255, 255, 255, 255)');
    main.rect(0, 0, 400, 400);

    // restore
    var colors = $('.colors span')
    for(var i = 0; i < colors.length; i++) {
      var selected = $(colors[i]).hasClass("color-selected");
      if(selected) {
        var hex = $(colors[i]).attr("hex");
        main.stroke(hex);
      }
    }
    mainCtx.globalCompositeOperation = 'source-over';
  });

  $('#download').on('click', function() {
    console.log('DOWNLOADING IMAGE...');
    this.href = document.getElementById('defaultCanvas1').toDataURL();
    this.download = 'sketch.png';
  });

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
  $('.result-container').empty();
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
          <button class="btn btn-primary"><a href="${img.link}">Open in Flickr ...</a></button>
          <button class="btn btn-info open-editor" title="${img.title}" url="${img.media.m}">Open in Editor ...</button>
        </div>
      </div>
    </div>
    `;
    $('.result-container').append(html);
  })
  setButtonEvents();
}

var setButtonEvents = function() {
  $('.open-editor').on('click', function() {

    // get eraser to work
    mainCtx.strokeStyle = 'rgb(255, 255, 255)';
    main.fill('rgb(255, 255, 255)');
    mainCtx.globalCompositeOperation = 'destination-out';
    mainCtx.strokeStyle = 'rbga(255, 255, 255, 255)';
    main.fill('rgba(255, 255, 255, 255)');
    main.rect(0, 0, 400, 400);

    // restore
    main.stroke('#000');
    mainCtx.globalCompositeOperation = 'source-over';

    $('.main').hide();
    $('.edit').show();
    var title = $(this).attr("title");
    var url = $(this).attr("url");
    console.log(url)
    var img = new Image;
    img.src = url;
    img.onload = function() {
      drawImageProp(bgCtx, img, 0, 0, 400, 400);
    };
    $('.title').empty().html(`<h2>${title}</h2>`);
  });
}

/* P5 AND CANVAS */

var bgCanvas = function(p) {
  p.setup = function() {
    p.createCanvas(400, 400);
    bgCtx = bg.canvas.getContext('2d');
    p.background('#FFF');
  };
};

var mainCanvas = function(p) {
  p.setup = function() {
    p.createCanvas(400, 400);
    mainCtx = main.canvas.getContext('2d');
    p.strokeWeight(6);
    p.stroke('#000');
    p.fill('#000');
  };
  p.draw = function() {
    if(p.mouseIsPressed) {
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }
  };
};

var mergeCanvas = function() {
  console.log('MERGING CANVAS');
  var canvas = document.getElementById('merge-canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(document.getElementById('defaultCanvas0'), 0, 0);
  ctx.drawImage(document.getElementById('defaultCanvas1'), 0, 0);
}

var bg = new p5(bgCanvas, 'canvas-container');
var bgCtx;
var main = new p5(mainCanvas, 'canvas-container');
var mainCtx;

/* HELPER */

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}
