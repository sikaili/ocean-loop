function touchStarted() {
  state = 1;
  let num =Math.floor(Math.random()*15);
  for(let i =0;i<num;i++){
    let dump = new Loop(random(0, 150 / 1024 * width), mouseX, mouseY);
    loops.push(dump);
  }
  console.log(loops);
}

function touchEnded() {
  state = 0;
}

function keyPressed() {
  loops.forEach(a => a.clock /= 10);

  keyCode == 32 ? save(cvs, "1.tif") : "";
}

function addSnapshot(id) {
  let dumps = [];
  for (let mm = 0; mm < draws.length; mm++) {
    let dump = draws[mm].mp.map(function (element) {
      return {
        x: element.x,
        y: element.y
      }
    })
    dumps.push(dump);
  }

  console.log(dumps);
  localStorage.setItem("canvas-" + id, JSON.stringify(dumps))
}

function removeSnapshot(id) {
  localStorage.removeItem("canvas-" + id);
}


function getSnapshot(id) {
  let canvas = JSON.parse(localStorage.getItem("canvas-" + id));
  return canvas;
}

function resetAllSnapshots() {
  localStorage.clear();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}