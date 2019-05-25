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

function setup() {
  pixelDensity(1)
  cvs = createCanvas(windowWidth, windowWidth / 16 * 9);
  cvs.parent('sketch-holder');
  btn = document.createElement('button');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  btn.onclick = record;
}

function draw() {

  background(255, 50);
  let r = 100;

  loops.map(a => {
    a.inter(loops);
    a.display(loops);
  });
  noStroke();
  fill(0, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * width));

  if (capturer) {
    capturer.capture(document.getElementById('defaultCanvas0'));
    if (counter == 8) {
      frameRate(0);
      btn.click();
    }
  }

}

function record() {
  x

  capturer = new CCapture({
    format: 'webm',
    framerate: 15
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
}



document.touchmove = function (n) {
  n.preventDefault();
};