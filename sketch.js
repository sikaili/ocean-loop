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
  // mic = new p5.AudioIn();
  // mic.start();
  cvs = createCanvas(windowWidth, windowHeight-100);
  cvs.parent('sketch-holder');

  btn = document.createElement('button');
  btn.textContent = "start recording";
  document.body.appendChild(btn);
  btn.onclick = record;
  // osc = new p5.Oscillator();
  // osc.disconnect();
  // osc.connect(filt);
  // osc.setType("sawtooth");
  // osc.start();
  // osc.freq(0);
  // link = createA("http://skyl.fr","http://skyl.fr");
  // link.style("color:#888884;font-family:HelveticaNeue-light,Helvetica;font-size:20px;")
  // link1 = createP("Sikai LI 2018","2018");
  // link1.style("color:#888884;font-family:Helvetica;font-size:17px;")
  // link1.position(0.92 * windowWidth - 60, 0.9 * windowHeight+17)
  // link.position(0.92 * windowWidth - 60, 0.9 * windowHeight)
}

function draw() {

  // clear();
  background(255, 50);
  let r = 100;
  loops.map(a => {
    a.inter(loops);
    a.display(loops);
  });
  noStroke();
  fill(0, 30);
  ellipse(mouseX, mouseY, calR(state, 7 / 1024 * width));
  // filter(INVERT);

  if(capturer){
    capturer.capture(document.getElementById('defaultCanvas0'));  
    if(counter == 8){
      frameRate(0);
      btn.click();
    }
  }

}

function record() {
  capturer = new CCapture({ format: 'webm' , framerate: 30} );
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

function calR(state, speed) {
  state == 1 ? r += speed : r = 10;
  return r;
}


document.touchmove = function (n) {
  n.preventDefault();
};