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

const nr_of_trees = (input, slope) => {
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

/* call for solutions */

const first = (input) => {
  return nr_of_trees(input, slope(3, 1));
}

const second = (input) => {
  return [
    slope(1,1),
    slope(3,1),
    slope(5,1),
    slope(7,1),
    slope(1,2)
  ].reduce((trees, slope) => trees * nr_of_trees(input, slope), 1)
}

console.log('solution first', first(input));
console.log('solution second', second(input));
