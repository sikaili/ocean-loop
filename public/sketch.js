"use strict";

p5.disableFriendlyErrors = true;
document.addEventListener("touchmove", function (n) {
  n.preventDefault();
}, {
  passive: false
});
var cvs;
var capturer;
var btn;
var counter = 1;
var state = -1;
var doubleClick,
    ts = [];
var mic, osc, filt;
var red;
var loops = [];
var r = 30;
var songs = [],
    reverb;
var amplitudes = [];

function preload() {
  Array(70).fill('').map(function (a, i) {
    songs[i] = loadSound("assets/horror/sound".concat(i % 7, ".wav"));
    amplitudes[i] = new p5.Amplitude();
  });
}

function setup() {
  frameRate(30);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  reverb = new p5.Reverb();
  init();
  reverb.amp(3);
}

function draw() {
  var amplis = amplitudes.map(function (a) {
    return a.getLevel();
  }).reduce(function (a, b) {
    return a + b;
  }); // console.log(amplis)

  background(0, 20 + amplis * 30);
  var r = 100;
  loops.map(function (a, i) {
    // a is visible in the canvas 
    if (a.r < (width + height) / 3 && a.pos.x > 0 && a.pos.x < width && a.pos.y > 0 && a.pos.y < height) {
      // a is colorful and not playing
      if ((a.coli.length % 3 === 1 && a.clock1 > 160 || a.coli.mouse) && !songs[i].isPlaying()) {
        var panning = constrain(map(a.pos.x, 0., width, -1.0, 1.0), -1, 1);
        songs[i].pan(panning);
        var rate = map(a.r, 50, (width + height) / 3, 0, 4);
        songs[i].setVolume(rate + (a.coli.mouse ? 3 : -1));
        songs[i].play(); // a is not colorful and playing
      } else if (!(a.coli.length % 3 === 1 && a.clock1 > 30 || a.coli.mouse) && songs[i].isPlaying()) {
        songs[i].setVolume(0, 1);
        setTimeout(function () {
          Math.random() > 0.3 ? songs[i].pause() : songs[i].stop();
        }, 1500);
      }

      var amp = amplitudes[i].getLevel();
      a.inter(loops);
      a.update();
      a.display(loops, amp);
    } else {
      songs[i].setVolume(0, 3);
      setTimeout(function () {
        songs[i].disconnect();
      }, 7000);
    }
  });
  noStroke();
  fill(180, 100, 100, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * (width + height) / 2));

  if (capturer) {
    capturer.capture(document.getElementById('defaultCanvas0'));

    if (counter == 8) {
      frameRate(0);
      btn.click();
    }
  }
}

function record() {
  capturer = new CCapture({
    format: 'webm',
    framerate: 30
  });
  capturer.start();
  btn.textContent = 'stop recording';

  btn.onclick = function (e) {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };

  window.onkeypress = function (e) {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
}

var createLoop = function createLoop(x, y, _r) {
  console.log(loops.length);
  _r > 100 ? background(random(100), 0, random(100), r / 2) : "";
  var num = Math.floor(Math.random() * 10); // num = 1;

  for (var i = 0; i < num; i++) {
    var dump = new Loop(_r + random(20), x, y);
    loops.push(dump);
  }

  loops.length > 66 ? init() : "";
};

var init = function init() {
  loops.length = 0;
  songs.map(function (a, i) {
    // Math.random() > 0.6 ? a.reverseBuffer() : reverb.process(a);
    reverb.process(a);
    a.play();
    a.playMode('sustain');
    a.setVolume(0);
    a.connect();
    a.stop();
    amplitudes[i].setInput(a);
  });
};

document.touchmove = function (n) {
  n.preventDefault();
};