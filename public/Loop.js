"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Loop = function Loop(r, _x, _y, n) {
  var _this = this;

  _classCallCheck(this, Loop);

  _defineProperty(this, "update", function () {
    if (!(_this.pos.x > 0 && _this.pos.x < width && _this.pos.y > 0 && _this.pos.y < height)) {
      _this.shrink = true;
    }

    _this.r > (width + height) / 3 - 50 ? _this.shrink = true : '';
    _this.shrink ? function () {
      _this.coli.length = 0;
      _this.r > 0.9 ? _this.r -= 1 * _this.clock1 / 180 : "";
      _this.coli.mouse = false;
    }() : "";
    _this.bigger ? function () {
      _this.r += 3;
    }() : '';
    _this.clock1 < 170 || _this.coli.length > 13 || millis() - _this.start > 7000 ? _this.pos.add(_this.go) : "";
  });

  _defineProperty(this, "display", function (array, amp) {
    push();
    _this.r < width / 6 ? fill(255, 1) : noFill();

    if (_this.coli.length % 3 === 1 && _this.clock1 > 160 || _this.coli.mouse) {
      stroke([random(0, 255), random(0, 255), random(0, 255), _this.clock1 / 1.5 + 30 + amp * 150]);
    } else {
      stroke(_this.shrink ? [255, _this.clock1 / 10 + 30] : [255, _this.r / 2 + amp * 150 + 20]);
    }

    beginShape();
    translate(_this.pos.x, _this.pos.y);

    for (var i = 0; i < PI * 2; i += 0.07) {
      _this.clock += 0.0002 * _this.clock1 / 200;
      _this.clock1 > 180 ? rotate(noise(_this.clock / 5, i) / 10 + _this.clock1 / 3 + amp / 100) : "";
      _this.clock1 < 170 && Math.random() > 0.5 ? _this.r += 0.1 : '';
      var x = spinningPlate(_this.r, i, _this.clock1, _this.clock, array.length + _this.coli.length, amp);
      var y = _this.r * sin(i);
      _this.clock1 < 150 && noise(_this.clock, i) > 0.8 ? vertex(y, x) : "";
      strokeWeight(1.5 / 1000 * (width + height) / 2 * _this.clock1 / 255 * pixelDensity() ^ 2 / 1.5 * map(_this.clock1, 140, 240, 0.7, 1.3));
      point(x + i, y + i);
      _this.clock1 > 200 ? vertex(y + noise(i, _this.clock) * 5, x + noise(i) * 100) : "";
    }

    Math.random() > 0.2 ? strokeWeight(1) : '';
    endShape();
    pop();
  });

  _defineProperty(this, "inter", function (array) {
    for (var i = 0; i < array.length; i++) {
      if (_this != array[i]) {
        var distance = p5.Vector.dist(_this.pos, array[i].pos);
        _this.coli.mouse = p5.Vector.dist(_this.pos, createVector(mouseX, mouseY)) < _this.r;

        if (distance < _this.r + array[i].r && _this.coli.indexOf(array[i]) == -1 && distance > 5) {
          _this.coli.push(array[i]); // this.pos.add(createVector(random(-3, 3), random(-3, 3)));
          // let d = this.clock > this.clock1 * 500 ? -10000 : 0.1;

        } else if (_this.coli.indexOf(array[i]) != -1) {// this.coli.splice(this.coli.indexOf(array[i]), 1);
        }
      }
    }
  });

  this.no = n;
  this.coli = [];
  this.pos = createVector(_x, _y);
  this.r = r;
  this.rInit = r;
  this.clock = random(140, 240);
  this.clock1 = JSON.parse(JSON.stringify(this.clock));
  this.go = createVector(random(-3, 3), random(-3, 3));
  this.start = JSON.parse(JSON.stringify(millis()));
  this.shrink = false;
  this.bigger = false;
};

function spinningPlate(r, i, clock1, clock, length, amp) {
  var n = Math.floor(clock1 + length / 2) % 6; // let n = 5;

  switch (n) {
    // 圆
    case 0:
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / (800 * amp) * length + clock) * cos(i);
      break;

    case 1:
      // return i / (2 * PI) * clock1 / 2 + 1 * r * cos(frameCount / 40 + clock) * sin(i)
      // start field 天线
      return i / (2 * PI) * clock1 / 5 * r * noise(clock / 500, i / 50) * noise(i / 50);
      break;
    //  蛹

    case 2:
      //best shape 噪音， 圆点，线
      return i / (2 * PI) * clock1 / 6 + noise(clock / 5) * r * sin(frameCount / clock1 + clock) * cos(i);
      break;

    case 3:
      return noise(i) * r * sin(frameCount / 40 + clock) * cos(i);
      break;

    case 4:
      //best shape 噪音， 圆点，线
      return noise(i, clock) * (r / 2) ^ 2 * cos(clock / 1000) * i;
      break;

    case 5:
      return noise(sin(i), cos(i)) * (r / 4) * i ^ 2 * tan(clock + 1);
      break;
  }
}