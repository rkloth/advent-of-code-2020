const fs = require("fs");

const crlf = /\r\n/g;

const input = fs
  .readFileSync(__dirname + "/input.txt", 'utf8')
  .replace(crlf, '\n')
  .split("\n")
  .filter(Boolean);

/*
  https://adventofcode.com/2020/day/2
*/

const collect = (row) => {
  const [policy, password] = row.split(':');
  const [range, character] = policy.split(' ');
  const [a, b] = range.split('-');

  return { password, character, a, b };
}

const down_the_road_policy = ({ password, character, a, b}) => {
  const matches = password.match(new RegExp(character, 'g'));

  if (matches == null && a > 0) return false;
  return (matches.length >= a && matches.length <= b);
};

const first = (input) => {
  return input.reduce((n, record) => n +(+down_the_road_policy(collect(record))), 0);
}

const official_policy = ({ password, character, a, b }) => {
  return password.charAt(a) === character ^ password.charAt(b) === character;
};

const second = (input) => {
  return input.reduce((n, record) => n +(+official_policy(collect(record))), 0);
}

console.log('nr of valid passwords', first(input));
console.log('nr of valid passwords', second(input));
