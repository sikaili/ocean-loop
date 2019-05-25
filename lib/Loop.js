"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Loop = function Loop(r, _x, _y) {
  var _this = this;

  _classCallCheck(this, Loop);

  _defineProperty(this, "update", function () {
    _this.clock1 > 180 ? _this.pos.add(_this.go) : "";
  });

  _defineProperty(this, "display", function (array) {
    push();
    fill(0, 0);
    stroke(_this.coli.length % 3 === 1 && _this.clock1 > 30 || _this.coli.mouse ? [random(0, 255), random(0, 255), random(0, 255)] : 255);
    beginShape();
    translate(_this.pos.x, _this.pos.y);
    rotate(_this.clock1);

    for (var i = 0; i < PI * 2; i += 0.08) {
      _this.clock += 0.00025;
      _this.clock1 > 180 ? rotate(noise(_this.clock) / 10 + _this.clock1 / 3) : "";
      _this.clock1 < 160 && Math.random() > 0.5 ? _this.r += 0.08 : '';
      var x = spinningPlate(_this.r, i, _this.clock1, _this.clock, array.length + _this.coli.length);
      var y = _this.r * sin(i);
      _this.clock1 < 180 && _this.clock1 > 30 ? vertex(y, x) : '';
      strokeWeight(2 / 1000 * (width + height) / 2 * _this.clock1 / 255 * pixelDensity());
      point(x + i, y + i); // this.coli.mouse && this.r < 100 ? vertex(x * noise(i), y) : "";
    } // Math.random() > 0.0 ? vertex(array[0].pos.x - this.pos.x, array[3].pos.y - this.pos.y) : "";


    endShape();
    pop();
  });

  _defineProperty(this, "inter", function (array) {
    for (var i = 0; i < array.length; i++) {
      if (_this != array[i]) {
        var distance = p5.Vector.dist(_this.pos, array[i].pos);
        _this.coli.mouse = p5.Vector.dist(_this.pos, createVector(mouseX, mouseY)) < _this.r;

        if (distance < _this.r + array[i].r && _this.coli.indexOf(array[i]) == -1 && distance > -1) {
          _this.coli.push(array[i]);

          var d = _this.clock > _this.clock1 * 500 ? -10000 : 0.1;
        }
      }
    }
  });

  this.coli = [];
  this.pos = createVector(_x, _y);
  this.r = r;
  this.clock = random(140, 240);
  this.clock1 = JSON.parse(JSON.stringify(this.clock));
  this.go = createVector(random(-3, 3), random(-3, 3));
};

function spinningPlate(r, i, clock1, clock, length) {
  var n = Math.floor(clock1 + length / 2) % 4;

  switch (n) {
    // 圆
    case 0:
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / 20 * length + clock) * cos(i);

    case 1:
      return i / (2 * PI) * clock1 / 2 + 1 * r * cos(frameCount / 20 + clock) * sin(i);
    //  蛹

    case 2:
      return i / (2 * PI) * clock1 / 5 + noise(clock) * r * sin(frameCount / 20 + clock) * cos(i);

    case 3:
      return noise(i) * r * sin(frameCount / 20 + clock) * cos(i);
  }
}