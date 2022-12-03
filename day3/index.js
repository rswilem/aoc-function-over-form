module.exports = {
  part1(input) {
    const lines = input.split('\n');

    let prioSum = 0;
    for (const line of lines) {
      const halfSize = Math.floor(line.length / 2);
      const first = line.substring(0, halfSize);
      const second = line.substring(halfSize);

      const common = [];
      for (const letter of first) {
        if (second.includes(letter) && !common.includes(letter)) {
          common.push(letter);
        }
      }

      for (const letter of second) {
        if (first.includes(letter) && !common.includes(letter)) {
          common.push(letter);
        }
      }

      for (const letter of common) {
        const code = letter.charCodeAt(0);
        let priority = code - 64 + 26;
        if (code > 90) {
          priority = code - 96;
        }

        prioSum += priority;
      }
    }

    return prioSum;
  },

  part2(input, part1Solution) {
    const lines = input.split('\n');

    let groupLines = [];
    let prioSum = 0;
    for (const line of lines) {
      const lineLetters = line.split('');
      groupLines.push(lineLetters);

      if (groupLines.length === 3) {
        const common = [];
        for (const groupLine of groupLines) {
          for (const groupLetter of groupLine) {
            let matches = 0;
            for (const groupLine2 of groupLines) {
              if (groupLine2.includes(groupLetter)) {
                matches++;
              }
            }

            if (matches >= 3 && !common.includes(groupLetter)) {
              common.push(groupLetter);
            }
          }
        }

        for (const letter of common) {
          const code = letter.charCodeAt(0);
          let priority = code - 64 + 26;
          if (code > 90) {
            priority = code - 96;
          }

          prioSum += priority;
        }

        groupLines = [];
      }
    }

    return prioSum;
  }
};
