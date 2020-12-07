/*
  https://adventofcode.com/2020/day/7
*/

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r/g, "")
  .split("\n\n");

const first = (input) => {
};

const second = (input) => {
};

console.log("solution first", first(input));
console.log("solution second", second(input));
