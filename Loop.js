function Loop(r, x, y) {
  this.coli = 0;
  this.pos = createVector(x, y);
  this.r = r;
  this.clock = random(255);
  this.clock1 = JSON.parse(JSON.stringify(this.clock));
  this.display = () => {
    fill(0, 0);
    stroke(!this.coli ? 0 : 0);
    push();
    translate(this.pos.x, this.pos.y)
    beginShape()
    rotate(this.clock1);
    for (let i = 0; i < PI * 2; i += 0.04) {
      this.clock += 0.0001 + this.clock / 20000;
      this.clock1 > 180 ? rotate((noise(this.clock) / 10) + this.clock1 / 3) : "";
      // rotate(5 / (noise(this.clock) + 10) + this.clock1 / 3);
      // let x = this.r * cos(i);
      let x = spinningPlate(this.r, i, this.clock1, this.clock);
      let y = this.r * sin(i);
      // let y = spinningPlate(100, this.clock1, i, this.clock)
      vertex(x, y);
      point(x + i, y + i);
    }
    endShape()
    pop();
  }

  this.inter = (array) => {
    for (let i = 0; i < array.length; i++) {
      if (this != array[i]) {
        let distance = p5.Vector.dist(this.pos, array[i].pos);
        if (distance < (this.r + array[i].r)) {
          this.coli += 1;
          let d = this.clock > this.clock1 * 500 ? -100 : 0.1;
          this.clock += d;
        }
      }
    }
  }
}

function spinningPlate(r, i, clock1, clock) {
  let n = Math.floor(clock1 / 80);
  // yuan
  if (n == 1) {
    return i / (2 * PI) * clock1 / 5 + 1 * r * sin(frameCount / 20 + clock) * cos(i)
  }
  //  蛹
  if (n == 2) {
    return i / (2 * PI) * clock1 / 5 + noise(clock) * r * sin(frameCount / 20 + clock) * cos(i)
  }
  if (n == 3) {
    return noise(clock) * r * sin(frameCount / 20 + clock) * cos(i)
  }

}