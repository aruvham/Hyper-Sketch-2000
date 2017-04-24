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
