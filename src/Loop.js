class Loop {
  constructor(r, x, y) {
    this.coli = [];
    this.pos = createVector(x, y);
    this.r = r;
    this.rInit = r;
    this.clock = random(140, 240);
    this.clock1 = JSON.parse(JSON.stringify(this.clock));
    this.go = createVector(random(-3, 3), random(-3, 3));
    this.start = JSON.parse(JSON.stringify(millis()));
    this.shrink = false;
    this.bigger = false;
  }
  update = () => {
    this.shrink ? (() => {
      this.coli.length = 0;
      this.r > 0.9 ? this.r -= 1 : "";
      this.coli.mouse = false;
    })() : "";
    this.bigger ? (() => {
      this.r += 2;
    })() : '';
    this.clock1 < 170 || this.coli.length > 13 || millis() - this.start > 7000 ? this.pos.add(this.go) : "";
  }
  display = (array, amp) => {
    push();
    this.r < width / 6 ? fill(255, 1) : noFill();
    if ((this.coli.length % 3 === 1 && this.clock1 > 160) || this.coli.mouse) {
      stroke([random(0, 255), random(0, 255), random(0, 255), (this.clock1 / 1.5 + 30 + amp * 150)]);
    } else {
      stroke([255, this.r / 2 + amp * 150 + 20]);
    }
    beginShape();
    translate(this.pos.x, this.pos.y);
    // push();
    // stroke(255, 30 + amp * 150);
    // text(amp.toString().slice(0, 5), 0, this.r);
    // pop();
    // this.r = this.rInit * (this.coli.length + 1) / 2;
    // rotate(this.clock1);
    for (let i = 0; i < PI * 2; i += 0.07) {
      this.clock += 0.0002 * this.clock1 / 200;
      this.clock1 > 180 ? rotate((noise(this.clock / 5, i) / 10) + this.clock1 / 3) : "";
      this.clock1 < 170 && Math.random() > 0.5 ? this.r += 0.1 : '';
      let x = spinningPlate(this.r, i, this.clock1, this.clock, array.length + this.coli.length, amp) * (this.clock1 < 220 ? constrain(map(amp, 0, 0.08, 1.3, 0.3), 1.3, 0.3) : 1);
      let y = this.r * sin(i);
      this.clock1 < 150 && noise(this.clock, i) > 0.8 ? vertex(y, x) : "";
      abs(x) > width / 3 ? strokeWeight(noise(x / 100, i) * 3) : "";

      strokeWeight((1.5 / 1000 * (width + height) / 2 * this.clock1 / 255) * pixelDensity() ^ 2 / 1.5 * map(this.clock1, 140, 240, 0.7, 1.3));
      point(x + i, y + i);
      this.clock1 > 200 ? vertex(y + noise(i, this.clock) * 5, x + noise(i) * 100) : "";
    }
    Math.random() > 0.2 ? strokeWeight(1) : '';
    endShape()
    pop();
  }

  inter = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (this != array[i]) {
        let distance = p5.Vector.dist(this.pos, array[i].pos);
        this.coli.mouse = (p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r);
        if (distance < (this.r + array[i].r) && this.coli.indexOf(array[i]) == -1 && distance > 5) {
          this.coli.push(array[i]);
          // this.pos.add(createVector(random(-3, 3), random(-3, 3)));
          let d = this.clock > this.clock1 * 500 ? -10000 : 0.1;
        } else if (this.coli.indexOf(array[i]) != -1) {
          // this.coli.splice(this.coli.indexOf(array[i]), 1);
        }
      }
    }
  }
}

function spinningPlate(r, i, clock1, clock, length, amp) {
  let n = (Math.floor(clock1 + length / 2) % 6);
  // let n = 5;
  switch (n) {
    // 圆
    case 0:
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / (160 * amp) * length + clock) * cos(i);
      break;
    case 1:
      // return i / (2 * PI) * clock1 / 2 + 1 * r * cos(frameCount / 40 + clock) * sin(i)
      // start field 天线
      return i / (2 * PI) * clock1 / 5 * r * noise(clock / 500, i / 50) * noise(i / 50);
      break
      //  蛹
    case 2:
      //best shape 噪音， 圆点，线
      return i / (2 * PI) * clock1 / 6 + noise(clock / 5) * r * sin(frameCount / clock1 + clock) * cos(i)
      break
    case 3:
      return noise(i) * r * sin(frameCount / 40 + clock) * cos(i)
      break
    case 4:
      //best shape 噪音， 圆点，线
      return noise(i, clock) * (r / 2) ^ 2 * cos(clock / 1000) * i
      break
    case 5:
      return noise(sin(i), cos(i)) * (r / 4) * i ^ 2 * tan(clock + 1)
      break
  }
}