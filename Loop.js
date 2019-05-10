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
    for (let i = 0; i < PI * 2; i += 0.04) {
      this.clock += 0.0001 + this.clock / 10000;
      // this.r = map(noise(this.clock), 0, 1, 0.9999, 1.0001) * this.r;
      rotate(10 / (noise(this.clock) + 10) + this.clock1)
      let x = (i / (2 * PI) * this.clock1 / 100 + noise(i / (2 * PI)) * this.r + tan(i) * 10 * sin(frameCount / 20 + this.clock)) * cos(i);
      let y = this.r * sin(i)
      vertex(x, y);
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
          let d = this.clock > this.clock1 * 500 ? -0.01 : -0.3;
          this.clock += d;
        }
      }
    }
  }
}