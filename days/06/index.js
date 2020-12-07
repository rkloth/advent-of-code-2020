/*
  https://adventofcode.com/2020/day/3
*/

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r/g, "")
  .replace(" ", "")
  .split("\n\n")
  .map((line) => line.split("\n").filter(Boolean));


const uniqueItemsFrom = (items) => [...new Set(items)];
const mergeArrays = (arrays) => arrays.reduce((a, b) => [...a, ...b]);

const nrOfIntersections = (uniqueItems, arrays) => {
  return uniqueItems.reduce((count, value) => {
    return count + Number(arrays.every((a) => a.includes(value)));
  }, 0);
};

const first = (input) => {
  return input.reduce((count, groupAnswers) => {
    return count + uniqueItemsFrom(mergeArrays(groupAnswers)).length;
  }, 0);
};

const second = (input) => {
  return input.reduce((count, groupAnswers) => {
    const uniqueItems = uniqueItemsFrom(mergeArrays(groupAnswers));

    return count + nrOfIntersections(uniqueItems, groupAnswers);
  }, 0);
};

console.log("solution first", first(input));
console.log("solution second", second(input));
