/*
  https://adventofcode.com/2020/day/3
*/

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r/g, "")
  .split('\n')
  .filter(Boolean);

const bitsToInt = (bits) => {
  return bits.reduce((acc, v) => {
    return (acc << 1) | v;
  });
};

const createSeatIdFrom = (encodedBoardingPass) => {
  const rowAsBits = Array.from(encodedBoardingPass.substr(0, 7)).map(c => {
    if (c === 'F') return 0;
    if (c === 'B') return 1;
  });

  const colAsBits = Array.from(encodedBoardingPass.substr(7)).map(c => {
    if (c === 'R') return 1;
    if (c === 'L') return 0;
  });

  return bitsToInt(rowAsBits) * 8 + bitsToInt(colAsBits);
}

const first = (input) => {
  return Math.max(...input.map(boardingPass => createSeatIdFrom(boardingPass)));
};

const second = (input) => {

};

console.log("solution first", first(input));
console.log("solution second", second());
