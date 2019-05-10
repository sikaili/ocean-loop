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
  createCanvas(windowWidth, windowHeight);
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
  background(255);
  let r = 100;
  loops.forEach(a => a.display());
  // console.clear();
  noStroke();
  fill(0, 30);
  if (state == 0) {
    ellipse(mouseX, mouseY, 255);
  }
}

function Loop(r, x, y, clock) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.clock = random(255);
  this.display = () => {
    fill(0, 0);
    stroke(0);
    push();
    translate(this.x, this.y)
    beginShape()

    for (let i = 0; i < PI * 2; i += 0.02) {
      this.clock += 0.0001;
      rotate(i / (noise(this.clock) + 10))
      let x = (this.r + tan(i) * 10 * sin(frameCount / 20 + this.clock)) * cos(i);
      let y = this.r * sin(i)
      vertex(x, y);
    }
    endShape()
    pop();
  }
}

function mouseClicked() {
  let dump = new Loop(random(50, 150), mouseX, mouseY);
  loops.push(dump);
  console.log(loops);
}
document.touchmove = function (n) {
  n.preventDefault();
};