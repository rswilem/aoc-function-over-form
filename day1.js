const fs = require("fs");

const inputData = fs.readFileSync(`${__dirname}/input/day1`)?.toString() || "";

if (!inputData?.length) {
  console.log("No input!");
  return;
}

const lines = inputData.split("\n");
const elves = [];
let elf = null;
let elfIndex = 1;
for (const line of lines) {
  if (!elf) {
    elf = {
      index: elfIndex,
      calories: 0,
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

console.log(highlightedElf);
console.log(`There are ${elves.length} elves!`);

const sortedElves = elves.sort((a, b) => {
  return a.calories < b.calories ? 1 : -1;
});

const sliced = sortedElves.slice(0, 3);

let topThreeCaloriesTotal = 0;
for (const existingElf of sliced) {
  topThreeCaloriesTotal += existingElf.calories;
}
console.log(topThreeCaloriesTotal);
