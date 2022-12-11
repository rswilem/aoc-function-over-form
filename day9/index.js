let uniqueTailPositions = [];

module.exports = {
  part1(input) {
    uniqueTailPositions = [];
    const head = { x: 0, y: 0 };
    let lastHead = null;
    const tail = { x: 0, y: 0 };

    const lines = input.split('\n');
    for (const line of lines) {
      const [direction, amount] = line.split(' ');
      for (let i = 0; i < amount; i++) {
        this.uniqueTailPos(tail);

        lastHead = { ...head };
        this.move(head, direction, 1);

        if (!this.isTouching(head, tail)) {
          tail.x = lastHead.x;
          tail.y = lastHead.y;
          this.uniqueTailPos(tail);
        }
      }
    }

    return uniqueTailPositions.length;
  },

  part2(input, part1Solution) {
    let moves = input.split('\n').map((line) => {
      let [direction, number] = line.split(' ');
      return { direction, number: parseInt(number) };
    });

    let body = new Array(10).fill(0).map((element) => {
      return { x: 0, y: 0 };
    });

    let direction = {
      L: { x: -1, y: 0 },
      R: { x: 1, y: 0 },
      U: { x: 0, y: -1 },
      D: { x: 0, y: 1 }
    };

    let positions = new Set(['0,0']);

    moves.forEach((move) => {
      for (let step = 0; step < move.number; step++) {
        body[0].x += direction[move.direction].x;
        body[0].y += direction[move.direction].y;

        for (let i = 1; i < body.length; i++) {
          let distX = body[i - 1].x - body[i].x;
          let distY = body[i - 1].y - body[i].y;

          if (Math.abs(distX) >= 2) {
            body[i].x += Math.sign(distX);
            if (Math.abs(distY) != 0) body[i].y += Math.sign(distY);
          } else if (Math.abs(distY) >= 2) {
            body[i].y += Math.sign(distY);
            if (Math.abs(distX) != 0) body[i].x += Math.sign(distX);
          }
        }

        positions.add(`${body[body.length - 1].x},${body[body.length - 1].y}`);
      }
    });

    // Should be 36
    return positions.size; // 2706, 5312 too high => 2653
  },

  uniqueTailPos(tail) {
    const utp = `${tail.x}-${tail.y}`;
    if (!uniqueTailPositions.includes(utp)) {
      uniqueTailPositions.push(utp);
    }
  },

  move(item, direction, amount) {
    amount = Number(amount);

    amount = ['L', 'D'].includes(direction) ? -amount : amount;

    if (['R', 'L'].includes(direction)) {
      item.x += amount;
    } else if (['U', 'D'].includes(direction)) {
      item.y += amount;
    }
  },

  isTouching(a, b) {
    const xDelta = Math.abs(a.x - b.x);
    const yDelta = Math.abs(a.y - b.y);

    return xDelta <= 1 && yDelta <= 1;
  }
};
