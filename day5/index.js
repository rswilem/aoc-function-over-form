module.exports = {
  part1(input) {
    const lines = input.split('\n');

    let contains = 0;
    for (const line of lines) {
      const sections = line
        .split(',')
        .map((section) => {
          const [start, end] = section.split('-');
          return [Number(start), Number(end)];
        })
        .sort((a, b) => {
          return a[0] > b[0] ? 1 : -1;
        });

      if (sections.length > 2) {
        console.log('Longer section found!');
        continue;
      }

      const [aStart, aEnd] = sections[0];
      const [bStart, bEnd] = sections[1];
      if ((aStart <= bStart && aEnd >= bEnd) || (aStart >= bStart && aEnd <= bEnd)) {
        contains++;
      }
    }

    return `${contains} of ${lines.length}`;
  },

  part2(input, part1Solution) {
    const lines = input.split('\n');

    let partial = 0;
    for (const line of lines) {
      const sections = line
        .split(',')
        .map((section) => {
          const [start, end] = section.split('-');
          return [Number(start), Number(end)];
        })
        .sort((a, b) => {
          return a[0] > b[0] ? 1 : -1;
        });

      if (sections.length > 2) {
        console.log('Longer section found!');
        continue;
      }

      const [aStart, aEnd] = sections[0];
      const [bStart, bEnd] = sections[1];
      if (aEnd >= bStart || bEnd <= aStart) {
        partial++;
      }
    }

    return `${partial} of ${lines.length}`;
  }
};
