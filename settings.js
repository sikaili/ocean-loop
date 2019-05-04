function touchStarted() {
  state = 1;
}

function touchEnded() {
  state = 0;
}

function keyPressed() {

  if (keyCode == 189 || keyCode == 187) {}

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