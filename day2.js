const fs = require("fs");

const inputData = fs.readFileSync(`${__dirname}/input/day2`)?.toString() || "";

if (!inputData?.length) {
  console.log("No input!");
  return;
}

const lines = inputData.split("\n");
let totalMeScore = 0;

const wins = ["1>3", "2>1", "3>2"];
for (const line of lines) {
  const [opponent, me] = line.split(" ");

  const opponentScore = opponent.toUpperCase().charCodeAt(0) - 64;
  const meScore = me.toUpperCase().charCodeAt(0) - 64 - 23;

  totalMeScore += meScore;

  if (opponentScore === meScore) {
    totalMeScore += 3;
    continue;
  }

  for (const win of wins) {
    const [winScore, lossScore] = win.split(">");

    if (opponentScore === Number(winScore) && meScore === Number(lossScore)) {
      break;
    } else if (
      opponentScore === Number(lossScore) &&
      meScore === Number(winScore)
    ) {
      totalMeScore += 6;
      break;
    }
  }
}

console.log(totalMeScore);

// Part 2
const wins = ["1>3", "2>1", "3>2"];
for (const line of lines) {
  const [opponent, outcome] = line.split(" ");

  const opponentScore = opponent.toUpperCase().charCodeAt(0) - 64;
  const outcomeNumber = outcome.toUpperCase().charCodeAt(0) - 64 - 23;
  let meScore = -1;

  if (outcomeNumber === 2) {
    // Draw
    meScore = Number(opponentScore);
  } else {
    const wantsWin = outcomeNumber >= 2;

    for (const win of wins) {
      const [winScore, lossScore] = win.split(">");

      if (wantsWin && opponentScore === Number(lossScore)) {
        meScore = Number(winScore);
        break;
      } else if (!wantsWin && opponentScore === Number(winScore)) {
        console.log(lossScore);
        meScore = Number(lossScore);
        break;
      }
    }
  }

  if (meScore === -1) {
    console.log("error");
    continue;
  }

  totalMeScore += meScore;

  if (opponentScore === meScore) {
    totalMeScore += 3;
    continue;
  }

  for (const win of wins) {
    const [winScore, lossScore] = win.split(">");

    if (opponentScore === Number(winScore) && meScore === Number(lossScore)) {
      break;
    } else if (
      opponentScore === Number(lossScore) &&
      meScore === Number(winScore)
    ) {
      totalMeScore += 6;
      break;
    }
  }
}

console.log(totalMeScore);
