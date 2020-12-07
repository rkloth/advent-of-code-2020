/*
  https://adventofcode.com/2020/day/3
*/

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean);


const bitsToInt = (bits) => bits.reduce((acc, v) => (acc << 1) | v);

const createSeatIdFrom = (encodedBoardingPass) => {
  const rowAsBitArray = Array.from(encodedBoardingPass.substr(0, 7)).map((c) => +(c === 'B'));
  const colAsBitArray = Array.from(encodedBoardingPass.substr(7)).map((c) => +(c === 'R'));

  return bitsToInt(rowAsBitArray) * 8 + bitsToInt(colAsBitArray);
};

const first = (input) => {
  return Math.max(...input.map((boardingPass) => createSeatIdFrom(boardingPass)));
};

const second = (input) => {
  const sortedBoardingPasses = input
    .map((boardingPass) => createSeatIdFrom(boardingPass))
    .sort((a, b) => a - b);

  for (
    let i = 0, j = sortedBoardingPasses[i];
    i < sortedBoardingPasses.length - 1;
    i++, j++
  ) {
    if (j !== sortedBoardingPasses[i]) return j;
  }
};

console.log("solution first", first(input));
console.log("solution second", second(input));
