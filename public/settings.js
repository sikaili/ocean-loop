"use strict";

function touchStarted() {
  loops.map(function (a) {
    a.coli.mouse ? Math.random() > 0.8 ? a.bigger = !a.bigger : a.shrink = !a.shrink : ''; // a.coli.mouse ? a.clock = 0 : "";
  }); // fullscreen(true);

  state != 1 ? state = 1 : ''; // console.log(getAudioContext());

  getAudioContext().state == "running" ? '' : getAudioContext().resume();
}

function touchMoved() {
  loops.map(function (a) {
    a.coli.mouse ? a.shrink = !a.shrink : '';
  });
  state !== 1 ? state = 1 : '';
}

function touchEnded() {
  state !== 0 ? state = 0 : '';
  createLoop(mouseX, mouseY, r);
}

function keyPressed() {
  loops.forEach(function (a) {
    return a.clock /= 10;
  });
  keyCode == 32 ? save(cvs, "".concat(frameCount, ".tif")) : "";
  keyCode == 8 ? init() : "";
  keyCode == 66 ? loops.map(function (a) {
    return a.shrink = true;
  }) : ""; // keyCode == 82 ? record() : "";
}

function calR(state, speed) {
  state == 1 ? r += speed : r = 50;
  r = constrain(r, 50, (width + height) / 5);
  return r;
}

function addSnapshot(id) {
  var dumps = [];

  for (var mm = 0; mm < draws.length; mm++) {
    var dump = draws[mm].mp.map(function (element) {
      return {
        x: element.x,
        y: element.y
      };
    });
    dumps.push(dump);
  }

  console.log(dumps);
  localStorage.setItem("canvas-" + id, JSON.stringify(dumps));
}

function removeSnapshot(id) {
  localStorage.removeItem("canvas-" + id);
}

function getSnapshot(id) {
  var canvas = JSON.parse(localStorage.getItem("canvas-" + id));
  return canvas;
}

function resetAllSnapshots() {
  localStorage.clear();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}