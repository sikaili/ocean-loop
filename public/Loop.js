"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Loop = function Loop(r, _x, _y) {
  var _this = this;

  _classCallCheck(this, Loop);

  _defineProperty(this, "update", function () {
    _this.shrink ? function () {
      _this.coli.length = 0;
      _this.r > 0 ? _this.r -= 1 : "";
      _this.coli.mouse = false;
    }() : "";
    _this.bigger ? function () {
      _this.r += 2;
    }() : '';
    _this.clock1 < 170 || _this.coli.length > 10 || millis() - _this.start > 7000 ? _this.pos.add(_this.go) : ""; // this.coli.mouse && this.r - this.rInit < 100 ? this.r += 0.1 : this.r -= this.r > this.rInit ? 0.1 : 0;
  });

  _defineProperty(this, "display", function (array, amp) {
    push();
    fill(0, 0);

    if (_this.coli.length % 3 === 1 && _this.clock1 > 160 || _this.coli.mouse) {
      stroke([random(0, 255), random(0, 255), random(0, 255), _this.clock1 / 1.5 + 30 + amp * 150]);
    } else {
      stroke([255, _this.r / 4 + amp * 150 + 20]);
    }

    beginShape();
    translate(_this.pos.x, _this.pos.y);
    push();
    stroke(255, 30 + amp * 150); // text(amp.toString().slice(0, 5), 0, this.r);

    pop(); // this.r = this.rInit * (this.coli.length + 1) / 2;

    rotate(_this.clock1);

    for (var i = 0; i < PI * 2; i += 0.07) {
      _this.clock += 0.0002;
      _this.clock1 > 180 ? rotate(noise(_this.clock) / 10 + _this.clock1 / 3) : "";
      _this.clock1 < 160 && Math.random() > 0.5 ? _this.r += 0.05 : '';
      var x = spinningPlate(_this.r, i, _this.clock1, _this.clock, array.length + _this.coli.length, amp) * (_this.clock1 < 220 ? constrain(map(amp, 0, 0.08, 1.3, 0.3), 1.3, 0.3) : 1);
      var y = _this.r * sin(i);
      _this.clock1 < 150 && noise(_this.clock, i) > 0.8 ? vertex(y, x) : "";
      strokeWeight(1.5 / 1000 * (width + height) / 2 * _this.clock1 / 255 * pixelDensity() ^ 2 / 1.5 * map(_this.clock1, 140, 240, 0.7, 1.3));
      abs(x) > width / 3 ? strokeWeight(noise(x) * 3) : "";
      point(x + i, y + i);
      Math.random() > 0.2 ? strokeWeight(1) : '';
      _this.clock1 > 200 ? vertex(y + noise(i, _this.clock) * 5, x + noise(i) * 100) : "";
    }

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


          var d = _this.clock > _this.clock1 * 500 ? -10000 : 0.1;
        } else if (_this.coli.indexOf(array[i]) != -1) {// this.coli.splice(this.coli.indexOf(array[i]), 1);
        }
      }
    }
  });

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
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / (160 * amp) * length + clock) * cos(i);
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