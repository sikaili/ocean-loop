class Loop {
  constructor(r, x, y) {
    this.coli = [];
    this.pos = createVector(x, y);
    this.r = r;
    this.clock = random(140, 240);
    this.clock1 = JSON.parse(JSON.stringify(this.clock));
    this.go = createVector(random(-3, 3), random(-3, 3));

  }
  update = () => {
    this.clock1 > 180 ? this.pos.add(this.go) : "";
  }
  display = (array) => {
    push();
    fill(0, 0);
    stroke((this.coli.length % 3 === 1 && this.clock1 > 30) || this.coli.mouse ? [random(0, 255), random(0, 255), random(0, 255)] : 255);
    beginShape();
    translate(this.pos.x, this.pos.y);
    rotate(this.clock1);
    for (let i = 0; i < PI * 2; i += 0.08) {
      this.clock += 0.00025;
      this.clock1 > 180 ? rotate((noise(this.clock) / 10) + this.clock1 / 3) : "";
      this.clock1 < 160 && Math.random() > 0.5 ? this.r += 0.08 : '';
      let x = spinningPlate(this.r, i, this.clock1, this.clock, array.length + this.coli.length);
      let y = this.r * sin(i);
      this.clock1 < 180 && this.clock1 > 30 ? vertex(y, x) : '';
      strokeWeight((2 / 1000 * (width + height) / 2 * this.clock1 / 255) * pixelDensity());
      point(x + i, y + i);
      // this.coli.mouse && this.r < 100 ? vertex(x * noise(i), y) : "";

    }

    // Math.random() > 0.0 ? vertex(array[0].pos.x - this.pos.x, array[3].pos.y - this.pos.y) : "";

    endShape()
    pop();
  }

  inter = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (this != array[i]) {
        let distance = p5.Vector.dist(this.pos, array[i].pos);
        this.coli.mouse = p5.Vector.dist(this.pos, createVector(mouseX, mouseY)) < this.r;
        if (distance < (this.r + array[i].r) && this.coli.indexOf(array[i]) == -1 && distance > -1) {
          this.coli.push(array[i]);
          let d = this.clock > this.clock1 * 500 ? -10000 : 0.1;
        }
      }
    }
  }
}

function spinningPlate(r, i, clock1, clock, length) {
  let n = (Math.floor(clock1 + length / 2) % 4);
  switch (n) {
    // 圆
    case 0:
      return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / 20 * length + clock) * cos(i)
    case 1:
      return i / (2 * PI) * clock1 / 2 + 1 * r * cos(frameCount / 20 + clock) * sin(i)
      //  蛹
    case 2:
      return i / (2 * PI) * clock1 / 5 + noise(clock) * r * sin(frameCount / 20 + clock) * cos(i)
    case 3:
      return noise(i) * r * sin(frameCount / 20 + clock) * cos(i)
  }
}