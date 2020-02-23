let defaultColor = undefined;

class Bar {
  constructor(x, y, width, height) {
    this.positionX = x;
    this.positionY = y;
    this.width = width;
    this.height = height;
    this.color = defaultColor;
    this.strokeColor = color(94, 132, 255);
  }
  draw() {
    fill(this.color);
    stroke(this.strokeColor);
    rect(this.positionX, this.positionY, this.width, this.height);
  }
}

class Graph {
  constructor(numBars, width, maxHeight, minHeight, startHeight = 0) {
    let individualWidth = width / numBars;

    /** @type {Bar[]} */
    this.bars = [];

    for (let i = 0; i < numBars; ++i) {
      this.bars.push(
        new Bar(
          i * individualWidth,
          startHeight,
          individualWidth,
          Math.floor(Math.random() * (maxHeight - minHeight) + minHeight),
        ),
      );
    }
  }

  // Accessors
  /** @type {function() : Bar[]} */
  getBars() {
    return this.bars;
  }

  // Utility
  swap(first, second) {
    let tempHeight = this.bars[first].height;
    this.bars[first].height = this.bars[second].height;
    this.bars[second].height = tempHeight;
  }
  setColor(index, color) {
    this.bars[index].color = color;
  }
  draw() {
    for (let i = 0; i < this.bars.length; ++i) {
      this.bars[i].draw();
    }
  }
}
