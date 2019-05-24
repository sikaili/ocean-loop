function touchStarted() {
  // fullscreen(true);
  state !== 1 ? state = 1 : '';
}

function touchEnded() {
  state !== 0 ? state = 0 : '';
  loops = loops.filter(a => a.r < width / 3);
  let num = Math.floor(Math.random() * 15);
  for (let i = 0; i < num; i++) {
    let dump = new Loop(r + random(-10, 10), mouseX, mouseY);
    loops.push(dump);
  }
}

function keyPressed() {
  loops.forEach(a => a.clock /= 10);

  keyCode == 32 ? save(cvs, "1.tif") : "";
  // keyCode == 82 ? record() : "";

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