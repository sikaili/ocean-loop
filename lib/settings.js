"use strict";

function touchStarted() {
  // fullscreen(true);
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
  keyCode == 32 ? save(cvs, "1.tif") : ""; // keyCode == 82 ? record() : "";
}

function calR(state, speed) {
  state == 1 ? r += speed : r = 10;
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