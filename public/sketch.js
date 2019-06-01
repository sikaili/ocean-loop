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
var r = 100;
var loops = [];
var songs = [],
    reverb = new p5.Reverb(),
    amplitudes = [];

function preload() {
  Array(8).fill('').map(function (a, i) {
    songs[i] = loadSound("assets/kunchong/kunchong".concat(i, ".m4a"), function (m) {
      for (var n = 8; n < 100; n += 8) {
        songs[i + n] = Object.assign(m);
      }
    });
  });
}

function setup() {
  frameRate(30);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder'); // btn = document.getElementById('record');
  // btn.textContent = "start recording";
  // document.body.appendChild(btn);
  // btn.onclick = record;
  // let m = setInterval(() => {
  //   createLoop(random(0, width), random(0, height), random(0, 0.1 * (width + height)));
  // }, 8000);
  // clearInterval(m);
  // masterVolume(0.1, 3, 3)

  init();
  reverb.amp(3);
  mouseX = width / 2;
  mouseY = height / 2;
  masterVolume(0.3);
}

function draw() {
  var amplis = amplitudes.map(function (a) {
    return a.getLevel();
  }).reduce(function (a, b) {
    return a + b;
  });
  background(0, 20 + constrain(amplis * 2, 0, 60) + loops.length / 4);
  loops.map(function (a, i) {
    var amp = amplitudes[i].getLevel(); // a is visible in the canvas 

    if (a.pos.x > -100 && a.pos.x < width + 100 && a.pos.y > -100 && a.pos.y < height + 100) {
      // a is colorful and not playing
      if ((a.coli.length % 3 === 1 && a.clock1 > 160 || a.coli.mouse) && amp < 0.0001) {
        var panning = constrain(map(width > height ? a.pos.x : a.pos.y, 0., width > height ? width : height, width > height ? -1.0 : 1.0, width > height ? 1.0 : -1.0), -1, 1);
        songs[i].pan(panning);
        var rate = map(a.r, 50, (width + height) / 3, 0, 4);
        songs[i].setVolume(rate + (a.coli.mouse ? 3 : -1), 1);
        !songs[i].isPlaying() ? songs[i].play() : '';

        if (amp == 0.0) {
          songs[i].connect();
        } // a is not colorful and playing

      } else if (!(a.coli.length % 3 === 1 && a.clock1 > 30 || a.coli.mouse) && amp > 0.0001) {
        songs[i].setVolume(0, 0.1);
      }

      a.inter(loops);
      a.update();
      a.display(loops, amp);
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
  var num = Math.ceil(Math.random() * 10); // num = 1;

  for (var i = 0; i < num; i++) {
    var dump = new Loop(_r + random(20), x, y, loops.length);
    console.log(dump.no);
    loops.push(dump);
  }

  loops.length > songs.length - 11 ? init() : "";
};

var init = function init() {
  var id = window.setTimeout(function () {}, 0);

  while (id--) {
    window.clearTimeout(id);
  }

  loops.length = 0;
  songs.map(function (a, i) {
    amplitudes.length == songs.length ? '' : amplitudes[i] = new p5.Amplitude();
    a.connect(); // Math.random() > 0.6 ? a.reverseBuffer() : reverb.process(a);

    reverb.process(a);
    a.setVolume(0);
    a.play();
    a.playMode('sustain');
    a.stop();
    amplitudes[i].setInput(a);
  });
};

document.touchmove = function (n) {
  n.preventDefault();
};