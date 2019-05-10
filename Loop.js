function Loop(r, x, y) {
  this.coli = 0;
  this.pos = createVector(x, y);
  this.r = r;
  this.clock = random(255);
  this.display = () => {
    fill(0, 0);
    stroke(!this.coli ? 0 : 0);
    push();
    translate(this.pos.x, this.pos.y)
    beginShape()
    for (let i = 0; i < PI * 2; i += 0.02) {
      this.clock += 0.0001;
      rotate(i / (noise(this.clock) + 10))
      let x = (this.r + tan(i) * 10 * sin(frameCount / 20 + this.clock)) * cos(i);
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
          this.clock += 0.01;
        }
      }
    }
  }
}