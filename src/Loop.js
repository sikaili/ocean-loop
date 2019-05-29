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
  }
  update = () => {
    this.clock1 < 170 || this.coli.length > 10 || millis() - this.start > 10000 ? this.pos.add(this.go) : "";
    // this.coli.mouse && this.r - this.rInit < 100 ? this.r += 0.1 : this.r -= this.r > this.rInit ? 0.1 : 0;
  }
  display = (array, amp) => {
    push();
    fill(0, 0);
    stroke((this.coli.length % 3 === 1 && this.clock1 > 160) || this.coli.mouse ? [random(0, 255), random(0, 255), random(0, 255), (this.clock1 / 1.5 + 30)] : [255, this.clock1 + 30]);
    beginShape();
    translate(this.pos.x, this.pos.y);
    push();
    stroke(255, 20);
    text(amp.toString().slice(0, 5), 0, this.r);
    pop();
    rotate(this.clock1);
    for (let i = 0; i < PI * 2; i += 0.07) {
      this.clock += 0.0002;
      this.clock1 > 180 ? rotate((noise(this.clock) / 10) + this.clock1 / 3) : "";
      this.clock1 < 160 && Math.random() > 0.5 ? this.r += 0.05 : '';
      let x = spinningPlate(this.r, i, this.clock1, this.clock, array.length + this.coli.length);
      let y = this.r * sin(i);
      this.clock1 < 150 && noise(this.clock, i) > 0.8 ? vertex(y, x) : "";
      strokeWeight((2 / 1000 * (width + height) / 2 * this.clock1 / 255) * pixelDensity() ^ 2 * map(this.clock1, 140, 240, 0.7, 1.3));
      point(x + i, y + i);
      this.clock1 > 200 ? vertex(y, x) : "";
    }
    endShape()
    pop();
  }

  inter = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (this != array[i]) {
        let distance = p5.Vector.dist(this.pos, array[i].pos);
        this.coli.mouse = (p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r);
        if (distance < (this.r + array[i].r) && this.coli.indexOf(array[i]) == -1 && distance > 2) {
          this.coli.push(array[i]);
          this.go.mult(-1);
          let d = this.clock > this.clock1 * 500 ? -10000 : 0.1;
        } else if (!this.coli.indexOf(array[i]) == -1) {
          this.coli.splice(this.coli.indexOf(array[i]), 1);
        }
      }
    }
  }
}

function spinningPlate(r, i, clock1, clock, length) {
  let n = (Math.floor(clock1 + length / 2) % 5);
  switch (n) {
    // 圆
    case 0:
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / 40 * length + clock) * cos(i)
    case 1:
      // return i / (2 * PI) * clock1 / 2 + 1 * r * cos(frameCount / 40 + clock) * sin(i)
      // start field
      return i / (2 * PI) * clock1 / 5 * r * noise(clock / 500, i / 50) * noise(i / 50);
      //  蛹
    case 2:
      return i / (2 * PI) * clock1 / 5 + noise(clock) * r * sin(frameCount / 40 + clock) * cos(i)
    case 3:
      return noise(i) * r * sin(frameCount / 40 + clock) * cos(i)
  }
}