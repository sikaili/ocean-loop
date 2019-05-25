"use strict";

p5.disableFriendlyErrors = true;
document.addEventListener("touchmove", function (n) {
  n.preventDefault();
}, {
  passive: false
});
var capturer;
var btn, cvs;
var counter = 1;
var state = -1;
var doubleClick,
    ts = [];
var mic, osc, filt;
var red;
var loops = [];
var r = 10;

function setup() {
  console.log(pixelDensity()); // pixelDensity(1);

  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder'); // btn = document.getElementById('record');
  // btn.textContent = "start recording";
  // document.body.appendChild(btn);
  // btn.onclick = record;

  var m = setInterval(function () {
    createLoop(random(0, width), random(0, height), random(0, 0.1 * (width + height) / 2));
  }, 8000); // clearInterval(m);
}

function draw() {
  background(0, 50);
  var r = 100;
  loops.map(function (a) {
    a.update();
    a.inter(loops);
    a.display(loops);
  });
  noStroke();
  fill(255, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * width)); // if (capturer) {
  //   capturer.capture(document.getElementById('defaultCanvas0'));
  //   if (counter == 8) {
  //     frameRate(0);
  //     btn.click();
  //   }
  // }
} // function record() {
//   capturer = new CCapture({
//     format: 'webm',
//     framerate: 30
//   });
//   capturer.start();
//   btn.textContent = 'stop recording';
//   btn.onclick = e => {
//     capturer.stop();
//     capturer.save();
//     capturer = null;
//     btn.textContent = 'start recording';
//     btn.onclick = record;
//   };
//   window.onkeypress = e => {
//     capturer.stop();
//     capturer.save();
//     capturer = null;
//     btn.textContent = 'start recording';
//     btn.onclick = record;
//   };
// }


function createLoop(x, y, _r) {
  _r > 50 ? background(random(100), 0, random(100), r * 4) : "";
  loops = loops.filter(function (a) {
    return a.r < width / 3 && a.pos.x > 0;
  });
  loops.length > 100 ? Math.random() > 0.1 ? loops.splice(0, 15) : loops.splice(0, 70) : "";
  var num = Math.floor(Math.random() * 10);
  y > height ? num = 0 : '';

  for (var i = 0; i < num; i++) {
    var dump = new Loop(_r + random(-10, 10), x, y);
    loops.push(dump);
  }
}

document.touchmove = function (n) {
  n.preventDefault();
};