p5.disableFriendlyErrors = true;


document.addEventListener(
  "touchmove",
  function (n) {
    n.preventDefault();
  }, {
    passive: false
  }
);

let capturer;
let btn;
let counter = 1;
let state = -1;
let doubleClick, ts = [];
let mic, osc, filt;
let red;
let loops = [];
let r = 10;
let songs = [];

function preload() {
  Array(100).fill('').map((a, i) => {
    songs[i] = loadSound(`assets/sound${i%5}.wav`);
    songs[i].playMode('sustain');
    // songs[i].setVolume(0);
  })
}

function setup() {

  // pixelDensity(1)
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  btn = document.getElementById('record');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  btn.onclick = record;
  // let m = setInterval(() => {
  //   createLoop(random(0, width), random(0, height), random(0, 0.1 * (width + height) / 2));
  // }, 3000);
  // clearInterval(m);
  // masterVolume(0.1, 3, 3)
  songs.map(a => {
    Math.random() > 0.1 ? a.reverseBuffer() : "";
  })
}

function draw() {
  background(0, 50);
  let r = 100;

  loops.map((a, i) => {
    a.update();
    if (a.r < (width + height) / 2 / 3 && (a.pos.x > 0 && a.pos.x < width && a.pos.y > 0 && a.pos.y < height)) {
      if (((a.coli.length % 3 === 1 && a.clock1 > 30) || a.coli.mouse) && !songs[i].isPlaying()) {
        let panning = constrain(map(a.pos.x, 0., width, -1.0, 1.0), -1, 1);
        songs[i].pan(panning);
        let rate = map(a.r, 0, (width + height) / 2 / 3, 0.6, 1.5);
        // setTimeout(() => {
        songs[i].play();
        // songs[i].setVolume(rate - 0.5, 0.5);

        // }, 500);
        // setTimeout(() => {
        // songs[i].play(0, rate, rate - 0.5);
        // }, 500);

      } else if (!((a.coli.length % 3 === 1 && a.clock1 > 30) || a.coli.mouse) && songs[i].isPlaying()) {
        songs[i].setVolume(0, 0.1);
        setTimeout(() => {
          songs[i].pause();
        }, 130);
      }
      a.inter(loops);
      a.display(loops);
    } else {
      songs[i].setVolume(0, 0.8)
      setTimeout(() => {
        songs[i].disconnect();
      }, 1300);
    }
  });
  noStroke();
  fill(255, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * (width + height) / 2));
  // loops = loops.filter(a => a.r < (width + height) / 2 / 3 && (a.pos.x > 0 && a.pos.x < width && a.pos.y > 0 && a.pos.y < height));

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

function createLoop(x, y, _r) {
  console.log(loops.length)
  _r > 50 ? background(random(100), 0, random(100), r * 4) : "";
  loops.length > 70 ? Math.random() > 0.1 ? loops.splice(0, 15) : loops.splice(0, 65) : "";
  let num = Math.floor(Math.random() * 10);
  // num = 1;
  y > height ? num = 0 : '';
  for (let i = 0; i < num; i++) {
    let dump = new Loop(_r + random(-10, 10), x, y);
    loops.push(dump);
  }
}



document.touchmove = function (n) {
  n.preventDefault();
};