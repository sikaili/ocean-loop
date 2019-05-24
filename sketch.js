document.addEventListener(
  "touchmove",
  function (n) {
    n.preventDefault();
  }, {
    passive: false
  }
);
let state = -1;
let doubleClick, ts = [];
let mic, osc, filt;
let red;
let loops = [];
let r = 10;

function setup() {
  mic = new p5.AudioIn();
  mic.start();
  cvs = createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator();
  osc.disconnect();
  osc.connect(filt);
  osc.setType("sawtooth");
  osc.start();
  osc.freq(0);
  // link = createA("http://skyl.fr","http://skyl.fr");
  // link.style("color:#888884;font-family:HelveticaNeue-light,Helvetica;font-size:20px;")
  // link1 = createP("Sikai LI 2018","2018");
  // link1.style("color:#888884;font-family:Helvetica;font-size:17px;")
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}

function draw() {
  background(100, 100);
  let r = 100;
  loops.map(a => {
    a.inter(loops);
    a.display(loops);
  });
  noStroke();
  fill(0, 30);
  ellipse(mouseX, mouseY, calR(state, 7));
}

function calR(state, speed) {
  state == 1 ? r += speed : r = 10;
  return r;
}


document.touchmove = function (n) {
  n.preventDefault();
};