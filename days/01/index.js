const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf-8")
  .split("\n")
  .filter(Boolean)
  .map((x) => +x)
  .sort((a, b) => a - b);

/*
  first puzzle as check
*/
const first = (input, target) => {
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input.length; j++)
      if (input[i] + input[j] === target)
        return input[i] * input[j];
  return;
};

/*
  first puzzle, but more performant:
  - using two pointers
  - traverse sorted list
  - if sum of pointers is bigger than 2020
    skip remaining iterations, no need
*/
const first_pointers = (input, target) => {
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = 0; j < input.length; j++) {
      if (input[i] + input[j] > target) break;
      if (input[i] + input[j] === target) return input[i] * input[j];
    }
  }
  return;
};

/*
  first puzzle, but ultra performant using only two traversals:
  - create object/hash of known values
    this allows for fast lookup later
  - traverse again and find whether
    - target subtracted from current element resides in hash
      find it and return.
*/
const first_hashmap = (input, target) => {
  let hash = {};

  for (let i = 0; i < input.length; i++) hash[input[i]] = i;
  for (let i = 0; i < input.length; i++) {
    let difference = target - input[i];
    if (hash.hasOwnProperty(difference) && hash[difference] !== i)
      return input[i] * difference;
  }
  return;
}

const second = (input, target) => {
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input.length; j++)
      for (let k = 0; k < input.length; k++)
        if (input[i] + input[j] + input[k] === target)
          return input[i] * input[j] * input[k];
};

// nog ff open
const second_hashmap = (input, target) => {
  for (let i = 0; i < input.length; i++) {

  }
}

console.log('first check', first(input, 2020));
console.log('first pointers', first_pointers(input, 2020));
console.log('first hashmap', first_hashmap(input, 2020));
console.log('second check', second(input, 2020));
console.log('second hashmap', second_hashmap(input, 2020));
