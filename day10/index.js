const register = {
  X: 1,
  cycles: 0
};

let rssi = 0;
let screen = null;

module.exports = {
  part1(input) {
    const lines = input.split('\n');
    for (const line of lines) {
      const [instruction, params] = line.split(' ');
      this.handleInstruction(instruction, params);
    }

    return rssi;
  },

  part2(input, part1Solution) {
    // clrscr
    register.X = 1;
    register.cycles = 0;
    screen = [];
    for (let y = 0; y < 6; y++) {
      screen[y] = [];
      for (let x = 0; x < 40; x++) {
        screen[y][x] = '.';
      }
    }

    const lines = input.split('\n');
    for (const line of lines) {
      const [instruction, params] = line.split(' ');
      this.handleInstruction(instruction, params);
    }

    for (let y = 0; y < 6; y++) {
      console.log(screen[y].join(''));
    }
  },

  handleInstruction(op, params) {
    switch (op) {
      case 'addx':
        this.addCycle();
        this.addCycle();
        register.X += Number(params);
        break;
      case 'noop':
        this.addCycle();
        break;
    }
  },

  addCycle() {
    if (screen) {
      if (register.cycles > 240) {
        register.cycles = 0;
      }

      const y = Math.floor(register.cycles / 40);
      const x = register.cycles % 40;

      const target = x;

      screen[y][x] = register.X >= target - 1 && register.X <= target + 1 ? '#' : ' ';

      register.cycles += 1;
    } else {
      register.cycles += 1;
      if ([20, 60, 100, 140, 180, 220].includes(register.cycles)) {
        rssi += register.cycles * register.X;
      }
    }
  }
};
