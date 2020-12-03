const fs = require("fs");

const crlf = /\r\n/g;

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(crlf, "\n")
  .split("\n")
  .filter(Boolean);

/*
  https://adventofcode.com/2020/day/3
*/

const first = (input, slope) => {
  let trees = 0;

  for (
    let i = 0, j = 0;
    i < input.length - slope.y;
    i += slope.y, j += slope.x
  ) {
    trees += +(input[i][j % input[i].length] === "#");
  }

  return trees;
};

const slope = (x, y) => {
  return { x, y };
};

console.log('number of trees', first(input, slope(3, 1)));
