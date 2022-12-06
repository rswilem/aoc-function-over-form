const fs = require('fs');

if (process.argv?.length <= 2) {
  console.log(`Run with arguments, e.g.: node index.js day3`);
  return;
}

let dayNumber = process.argv[2] || '0';
dayNumber = Number(dayNumber.toString().replace('day', ''));

let inputData = null;
try {
  inputData = fs.readFileSync(`${__dirname}/day${dayNumber}/input.txt`)?.toString() || '';
  if (!inputData?.length) {
    throw new Error();
  }
} catch (e) {
  console.log(`\x1b[41mNo input for day ${dayNumber}!\x1b[0m`);
  return;
}

const dayCode = require(`${__dirname}/day${dayNumber}/index.js`);

console.log(`The solutions for \x1b[36mday ${dayNumber}\x1b[0m:`);
if (dayCode.part1) {
  const solution = dayCode.part1(inputData);
  console.log(`\x1b[35mPart 1: ${solution}\x1b[0m`);

  if (dayCode.part2) {
    const solutionDay2 = dayCode.part2(inputData, solution);
    console.log(`\x1b[34mPart 2: ${solutionDay2}\x1b[0m`);
  } else {
    console.log('\x1b[41mPart 2 was not found.\x1b[0m');
  }
} else {
  console.log('\x1b[41mPart 1 was not found.\x1b[0m');
}
