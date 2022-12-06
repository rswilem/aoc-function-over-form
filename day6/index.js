module.exports = {
  part1(input) {
    for (let i = 0; i < input.length; i++) {
      const chars = [input[i], input[i + 1], input[i + 2], input[i + 3]];

      for (const char of chars) {
        if (!char?.length) {
          console.log('End of string');
          return -1;
        }
      }

      if (this.isUnique(chars)) {
        return i + chars.length;
      }
    }
  },

  part2(input, part1Solution) {
    for (let i = 0; i < input.length; i++) {
      let chars = [];
      for (let j = 0; j < 14; j++) {
        chars.push(input[i + j]);
      }

      for (const char of chars) {
        if (!char?.length) {
          console.log('End of string');
          return -1;
        }
      }

      if (this.isUnique(chars)) {
        return i + chars.length;
      }
    }
  },

  isUnique(characters = []) {
    for (const char of characters) {
      if (characters.indexOf(char) !== characters.lastIndexOf(char)) {
        return false;
      }
    }

    return true;
  }
};
