module.exports = {
  part1(input) {
    const lines = input.split('\n');
    const elves = [];
    let elf = null;
    let elfIndex = 1;
    for (const line of lines) {
      if (!elf) {
        elf = {
          index: elfIndex,
          calories: 0
        };
      }

      if (line.length === 0) {
        elves.push(elf);
        elfIndex++;
        elf = null;
        continue;
      }

      const calories = Number(line);
      if (calories > 0) {
        elf.calories += calories;
      }
    }

    let highlightedElf = null;
    for (const existingElf of elves) {
      if (existingElf.calories > (highlightedElf?.calories || 0)) {
        highlightedElf = existingElf;
      }
    }

    return highlightedElf.calories;
  },

  part2(input, part1Solution) {
    const lines = input.split('\n');
    const elves = [];
    let elf = null;
    let elfIndex = 1;
    for (const line of lines) {
      if (!elf) {
        elf = {
          index: elfIndex,
          calories: 0
        };
      }

      if (line.length === 0) {
        elves.push(elf);
        elfIndex++;
        elf = null;
        continue;
      }

      const calories = Number(line);
      if (calories > 0) {
        elf.calories += calories;
      }
    }

    const sortedElves = elves.sort((a, b) => {
      return a.calories < b.calories ? 1 : -1;
    });

    const sliced = sortedElves.slice(0, 3);

    let topThreeCaloriesTotal = 0;
    for (const existingElf of sliced) {
      topThreeCaloriesTotal += existingElf.calories;
    }

    return topThreeCaloriesTotal;
  }
};
