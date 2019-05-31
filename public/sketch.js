"use strict";

p5.disableFriendlyErrors = true;
document.addEventListener("touchmove", function (n) {
  n.preventDefault();
}, {
  passive: false
});
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
    songs[i] = loadSound("assets/horror/sound".concat(i % 5, ".wav"));
    amplitudes[i] = new p5.Amplitude();
  });
}

function setup() {
  // pixelDensity(1)
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  btn = document.getElementById('record');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  reverb = new p5.Reverb();
  btn.onclick = record; // let m = setInterval(() => {
  //   createLoop(random(0, width), random(0, height), random(0, 0.1 * (width + height)));
  // }, 6000);
  // clearInterval(m);
  // masterVolume(0.1, 3, 3)

  songs.map(function (a, i) {
    Math.random() > 0.6 ? a.reverseBuffer() : reverb.process(a);
    a.play();
    a.playMode('sustain');
    a.setVolume(0);
    a.connect();
    a.stop();
    amplitudes[i].setInput(a);
  });
  reverb.amp(3);
}

function draw() {
  background(0, 35);
  var r = 100;
  loops.map(function (a, i) {
    a.update();

    if (a.r < (width + height) / 2 / 2 && a.pos.x > 0 && a.pos.x < width && a.pos.y > 0 && a.pos.y < height) {
      if ((a.coli.length % 3 === 1 && a.clock1 > 30 || a.coli.mouse) && !songs[i].isPlaying()) {
        var panning = constrain(map(a.pos.x, 0., width, -1.0, 1.0), -1, 1);
        songs[i].pan(panning);
        var rate = map(a.r, 0, (width + height) / 2 / 3, 0.2, 1.3);
        songs[i].setVolume(rate, 1);
        songs[i].play();
      } else if (!(a.coli.length % 3 === 1 && a.clock1 > 30 || a.coli.mouse) && songs[i].isPlaying()) {
        songs[i].setVolume(0, 1);
        setTimeout(function () {
          Math.random() > 0.3 ? songs[i].pause() : songs[i].stop();
        }, 1500);
      }

      var amp = amplitudes[i].getLevel();
      a.inter(loops);
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

function createLoop(x, y, _r) {
  console.log(loops.length);
  _r > 50 ? background(random(100), 0, random(100), r * 4) : ""; // loops.length > 70 ? Math.random() > 0.1 ? loops.splice(0, 15) : loops.splice(0, 65) : "";

  var num = Math.floor(Math.random() * 10); // num = 1;

  y > height ? num = 0 : '';

  for (var i = 0; i < num; i++) {
    var dump = new Loop(_r + random(20), x, y);
    loops.push(dump);
  }

  loops.length > 70 ? function () {
    loops.splice(0, 70);
    songs.map(function (a) {
      a.playMode('sustain');
      a.play();
      a.setVolume(0);
      a.connect();
      a.stop();
    });
  }() : "";
}

document.touchmove = function (n) {
  n.preventDefault();
};