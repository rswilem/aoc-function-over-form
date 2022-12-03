const fs = require("fs");

const inputData = fs.readFileSync(`${__dirname}/input/day3`)?.toString() || "";

if (!inputData?.length) {
  console.log("No input!");
  return;
}

const lines = inputData.split("\n");

// let prioSum = 0;
// for (const line of lines) {
//   const halfSize = Math.floor(line.length / 2);
//   const first = line.substring(0, halfSize);
//   const second = line.substring(halfSize);
//   console.log(first);
//   console.log(second);

//   const common = [];
//   for (const letter of first) {
//     if (second.includes(letter) && !common.includes(letter)) {
//       common.push(letter);
//     }
//   }

//   for (const letter of second) {
//     if (first.includes(letter) && !common.includes(letter)) {
//       common.push(letter);
//     }
//   }

//   for (const letter of common) {
//     const code = letter.charCodeAt(0);
//     let priority = code - 64 + 26;
//     if (code > 90) {
//       priority = code - 96;
//     }

//     prioSum += priority;
//   }
// }
// console.log(prioSum);

// Part 2

let groupLines = [];
let prioSum = 0;
for (const line of lines) {
  const lineLetters = line.split("");
  groupLines.push(
    lineLetters
      .sort((a, b) => {
        return a.charCodeAt(0) > b.charCodeAt(0) ? 1 : -1;
      })
      .join("")
  );
  console.log(groupLines);

  if (groupLines.length === 3) {
    return;
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
console.log(prioSum);
