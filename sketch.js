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
  // pixelDensity(1);
  cvs = createCanvas(windowWidth, windowHeight);
  cvs.parent('sketch-holder');
  btn = document.getElementById('record');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  btn.onclick = record;
  let m = setInterval(() => {
    createLoop(random(0, width), random(0, height), random(0, 0.1 * width));
  }, 8000);
  // clearInterval(m);
}

function draw() {

  background(0, 50);
  let r = 100;

  loops.map(a => {
    a.update();

    a.inter(loops);
    a.display(loops);
  });
  noStroke();
  fill(0, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * width));

  // if (capturer) {
  //   capturer.capture(document.getElementById('defaultCanvas0'));
  //   if (counter == 8) {
  //     frameRate(0);
  //     btn.click();
  //   }
  // }

}

// function record() {
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
  loops = loops.filter(a => a.r < width / 3 && a.pos.x > 0);
  loops.length > 100 ? Math.random() > 0.1 ? loops.splice(0, 15) : loops.splice(0, 70) : "";
  let num = Math.floor(Math.random() * 10);
  y > height ? num = 0 : '';
  for (let i = 0; i < num; i++) {
    let dump = new Loop(_r + random(-10, 10), x, y);
    loops.push(dump);
  }
}



document.touchmove = function (n) {
  n.preventDefault();
};