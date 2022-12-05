module.exports = {
  part1(input) {
    const lines = input.split('\n');

    // Fill initial arrays
    const stacks = [];
    for (const rawLine of lines) {
      if (!rawLine.includes('[') || rawLine.trim().startsWith('move')) {
        break;
      }

      const line = rawLine
        .replace(/\s\s\s\s\s/gi, ' [ ] ')
        .replace(/\s\s\s/gi, '[ ]')
        .replace(/\[\s\]/gi, '[!]')
        .replace(/\]\[/gi, '] [')
        .replace(/\s\s/gi, ' ');

      const items = line
        .split(' ')
        .filter((item) => item.length > 0)
        .map((item) => {
          return item.replace('[', '').replace(']', '');
        });

      for (let i = 0; i < items.length; i++) {
        if (!stacks[i]) {
          stacks[i] = [];
        }

        if (items[i] === '!') {
          continue;
        }

        stacks[i].unshift(items[i]);
      }
    }

    for (const line of lines) {
      if (!line.trim().startsWith('move')) {
        continue;
      }

      const match = line.match(/move ([0-9]+)? from ([0-9]+)? to ([0-9]+)?/i);
      const amount = Number(match[1]);
      const sourceStackIndex = Number(match[2]) - 1;
      const targetStackIndex = Number(match[3]) - 1;

      if (amount <= 0 || amount > stacks[sourceStackIndex].length) {
        console.log(`Invalid command! ${amount}: ${line}`);
        continue;
      }

      const itemsToMove = stacks[sourceStackIndex].splice(stacks[sourceStackIndex].length - amount, amount).reverse();
      for (const item of itemsToMove) {
        stacks[targetStackIndex].push(item);
      }
    }

    return this.topStacks(stacks);
  },

  part2(input, part1Solution) {
    const lines = input.split('\n');

    // Fill initial arrays
    const stacks = [];
    for (const rawLine of lines) {
      if (!rawLine.includes('[') || rawLine.trim().startsWith('move')) {
        break;
      }

      const line = rawLine
        .replace(/\s\s\s\s\s/gi, ' [ ] ')
        .replace(/\s\s\s/gi, '[ ]')
        .replace(/\[\s\]/gi, '[!]')
        .replace(/\]\[/gi, '] [')
        .replace(/\s\s/gi, ' ');

      const items = line
        .split(' ')
        .filter((item) => item.length > 0)
        .map((item) => {
          return item.replace('[', '').replace(']', '');
        });

      for (let i = 0; i < items.length; i++) {
        if (!stacks[i]) {
          stacks[i] = [];
        }

        if (items[i] === '!') {
          continue;
        }

        stacks[i].unshift(items[i]);
      }
    }

    for (const line of lines) {
      if (!line.trim().startsWith('move')) {
        continue;
      }

      const match = line.match(/move ([0-9]+)? from ([0-9]+)? to ([0-9]+)?/i);
      const amount = Number(match[1]);
      const sourceStackIndex = Number(match[2]) - 1;
      const targetStackIndex = Number(match[3]) - 1;

      if (amount <= 0 || amount > stacks[sourceStackIndex].length) {
        console.log(`Invalid command! ${amount}: ${line}`);
        continue;
      }

      const itemsToMove = stacks[sourceStackIndex].splice(stacks[sourceStackIndex].length - amount, amount);
      for (const item of itemsToMove) {
        stacks[targetStackIndex].push(item);
      }
    }

    return this.topStacks(stacks);
  },

  topStacks(stacks) {
    let result = '';
    for (const stack of stacks) {
      const item = stack[stack.length - 1];
      result += item.toString();
    }

    return result;
  }
};
