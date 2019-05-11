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
  background(255, 100);
  let r = 100;
  loops.forEach(a => {
    a.inter(loops);
    a.display();
  });
  // console.clear();
  noStroke();
  fill(0, 30);
  if (state == 0) {
    ellipse(mouseX, mouseY, 255);
  }
}



document.touchmove = function (n) {
  n.preventDefault();
};