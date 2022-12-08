const trees = [];

module.exports = {
  part1(input) {
    this.prep(input);

    const visibleAroundSimple = trees[0].length * 2 + (trees.length - 2) * 2;

    let visible = 0;
    for (let y = 0; y < trees.length; y++) {
      for (let x = 0; x < trees[y].length; x++) {
        if (this.isVisible(x, y)) {
          visible++;
        }
      }
    }

    return visible >= visibleAroundSimple ? visible : -1;
  },

  part2(input, part1Solution) {
    let highestScore = 0;
    for (let y = 0; y < trees.length; y++) {
      for (let x = 0; x < trees[y].length; x++) {
        highestScore = Math.max(this.scenicScore(x, y), highestScore);
      }
    }

    return highestScore;
  },

  prep(input) {
    const lines = input.split('\n');
    for (const line of lines) {
      const treeLine = [];
      for (const treeHeight of line) {
        treeLine.push(Number(treeHeight));
      }

      trees.push(treeLine);
    }
  },

  isVisible(x, y) {
    if (y <= 0 || y >= trees.length - 1) {
      return true;
    }

    if (x <= 0 || x >= trees[y].length - 1) {
      return true;
    }

    const target = trees[y][x];

    // Beam left
    let leftVisible = true;
    for (let i = x - 1; i >= 0; i--) {
      if (trees[y][i] >= target) {
        leftVisible = false;
        break;
      }
    }

    // Beam right
    let rightVisible = true;
    for (let i = x + 1; i < trees[y].length; i++) {
      if (trees[y][i] >= target) {
        rightVisible = false;
        break;
      }
    }

    // Beam top
    let topVisible = true;
    for (let i = y - 1; i >= 0; i--) {
      if (trees[i][x] >= target) {
        topVisible = false;
        break;
      }
    }

    // Beam bottom
    let bottomVisible = true;
    for (let i = y + 1; i < trees.length; i++) {
      if (trees[i][x] >= target) {
        bottomVisible = false;
        break;
      }
    }

    return topVisible || bottomVisible || leftVisible || rightVisible;
  },

  scenicScore(x, y) {
    if (y <= 0 || y >= trees.length - 1) {
      return 0;
    }

    if (x <= 0 || x >= trees[y].length - 1) {
      return 0;
    }

    const target = trees[y][x];

    // Beam left
    let scoreLeft = 0;
    for (let i = x - 1; i >= 0; i--) {
      scoreLeft++;
      if (trees[y][i] >= target) {
        break;
      }
    }

    // Beam right
    let scoreRight = 0;
    for (let i = x + 1; i < trees[y].length; i++) {
      scoreRight++;
      if (trees[y][i] >= target) {
        break;
      }
    }

    // Beam top
    let scoreTop = 0;
    for (let i = y - 1; i >= 0; i--) {
      scoreTop++;
      if (trees[i][x] >= target) {
        break;
      }
    }

    // Beam bottom
    let scoreBottom = 0;
    for (let i = y + 1; i < trees.length; i++) {
      scoreBottom++;
      if (trees[i][x] >= target) {
        break;
      }
    }

    return scoreTop * scoreBottom * scoreLeft * scoreRight;
  }
};
