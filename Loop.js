function Loop(r, x, y) {
  this.coli = [];
  this.pos = createVector(x, y);
  this.r = r;
  this.clock = random(150, 240);
  this.clock1 = JSON.parse(JSON.stringify(this.clock));
  this.display = (array) => {
    fill(0, 0);
    stroke((this.coli.length % 3 === 1 && this.clock1 > 30) ? [random(0,255),random(0,255),random(0,255)] : 0);
    push();
    beginShape()
    translate(this.pos.x, this.pos.y)
    rotate(this.clock1);
    for (let i = 0; i < PI * 2; i += 0.08) {
      this.clock += 0.0003;
      this.clock1 > 180 ? rotate((noise(this.clock) / 10) + this.clock1 / 3) : "";
      this.clock1 < 160 ? this.r+=0.001:'';
      // rotate(5 / (noise(this.clock) + 10) + this.clock1 / 3);
      // let x = this.r * cos(i);
      let x = spinningPlate(this.r, i, this.clock1, this.clock, array.length);
      let y = this.r * sin(i);
      // y = spinningPlate(100, this.clock1, i, this.clock)
      this.clock1 < 180 && this.clock1 > 30 ? vertex(y, x) : '';
      strokeWeight(2 / 1000 * width * this.clock1 / 255)
      point(x + i, y + i);
      // vertex(x,y);
    }
    // strokeWeight(1 / 1000 * width * (this.clock1 + array.length) / 255)

    endShape()
    pop();
  }

  this.inter = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (this != array[i]) {
        let distance = p5.Vector.dist(this.pos, array[i].pos);
        if (distance < (this.r + array[i].r) && this.coli.indexOf(array[i]) == -1) {
          this.coli.push(array[i]);
          let d = this.clock > this.clock1 * 500 ? -10000 : 0.1;
          // this.clock += d;
        }
      }
    }
  }
}

function spinningPlate(r, i, clock1, clock, length) {
  // let n = Math.floor(clock1 / 80);
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