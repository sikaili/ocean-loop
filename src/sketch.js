p5.disableFriendlyErrors = true;
document.addEventListener(
  "touchmove",
  function (n) {
    n.preventDefault();
  }, {
    passive: false
  }
);
let cvs;
let capturer;
let btn;
let counter = 1;
let state = -1;
let doubleClick, ts = [];
let mic, osc, filt;
let red;
let loops = [];
let r = 30;
let songs = [],
  reverb;
let amplitudes = [];

function preload() {
  Array(8).fill('').map((a, i) => {
    songs[i] = loadSound("assets/sound".concat(i, ".wav"), a => {
      for (let n = 8; n < 60; n += 8) {
        songs[i + n] = Object.assign(a);
      }
    });
  })
}

function setup() {
  console.log(songs.length);
  // pixelDensity(1)
  frameRate(30);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  btn = document.getElementById('record');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  reverb = new p5.Reverb();
  btn.onclick = record;
  // let m = setInterval(() => {
  //   createLoop(random(0, width), random(0, height), random(0, 0.1 * (width + height)));
  // }, 8000);
  // clearInterval(m);
  // masterVolume(0.1, 3, 3)
  init();
  reverb.amp(3);
  mouseX = width / 2;
  mouseY = height / 2;
}

function draw() {
  let amplis = amplitudes.map(a => a.getLevel()).reduce((a, b) => a + b);
  // console.log(amplis)
  background(0, 20 + amplis * 5 + loops.length / 2);
  let r = 100;
  loops.map((a, i) => {
    // a is visible in the canvas 
    if (a.r < (width + height) / 3 && (a.pos.x > 0 && a.pos.x < width && a.pos.y > 0 && a.pos.y < height)) {
      // a is colorful and not playing
      if (((a.coli.length % 3 === 1 && a.clock1 > 160) || a.coli.mouse) && !songs[i].isPlaying()) {
        let panning = constrain(map(a.pos.x, 0., width, -1.0, 1.0), -1, 1);
        songs[i].pan(panning);
        let rate = map(a.r, 50, (width + height) / 3, 0, 4);
        songs[i].setVolume((rate + (a.coli.mouse ? 3 : -1)));
        songs[i].play();
        // a is not colorful and playing
      } else if (!((a.coli.length % 3 === 1 && a.clock1 > 30) || a.coli.mouse) && songs[i].isPlaying()) {
        songs[i].setVolume(0, 1);
        setTimeout(() => {
          Math.random() > 0.3 ? songs[i].pause() : songs[i].stop();
        }, 1500);
      }
      let amp = amplitudes[i].getLevel();
      a.inter(loops);
      a.update();
      a.display(loops, amp);
    } else {
      // disconnect()
      songs[i].setVolume(0, 3);
      setTimeout(() => {
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

  btn.onclick = e => {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
  window.onkeypress = e => {
    capturer.stop();
    capturer.save();
    capturer = null;
    btn.textContent = 'start recording';
    btn.onclick = record;
  };
}

const createLoop = (x, y, _r) => {
  console.log(loops.length)
  _r > 100 ? background(random(100), 0, random(100), r / 2) : "";
  let num = Math.floor(Math.random() * 10);
  // num = 1;
  for (let i = 0; i < num; i++) {
    let dump = new Loop(_r + random(20), x, y);
    loops.push(dump);
  }
  loops.length > songs.length - 11 ?
    init() :
    ""
}

const init = () => {
  setTimeout(() => {
    let id = window.setTimeout(function () {}, 0);
    while (id--) {
      window.clearTimeout(id);
      // will do nothing if no timeout with id is present
    }
  }, 500);
  loops.length = 0;
  songs.map((a, i) => {
    amplitudes.length == songs.length ? '' : amplitudes[i] = new p5.Amplitude();
    a.connect();
    // Math.random() > 0.6 ? a.reverseBuffer() : reverb.process(a);
    reverb.process(a);
    a.setVolume(0);
    a.play();
    a.playMode('sustain');
    a.stop();
    amplitudes[i].setInput(a);
  })
}



document.touchmove = function (n) {
  n.preventDefault();
};