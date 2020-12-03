const fs = require("fs");

const crlf = /\r\n/g;

const input = fs
  .readFileSync(__dirname + "/input.txt", 'utf8')
  .replace(crlf, '\n')
  .split("\n")
  .filter(Boolean);

/*
  For example, suppose you have the following list:

  1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc

  Each line gives the password policy and then the password.
  The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid.
  For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

  In the above example, 2 passwords are valid.
  The middle password, cdefg, is not; it contains no instances of b, but needs at least 1.
  The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

  How many passwords are valid according to their policies?
*/

const collectPasswordInfo = (row) => {
  const [policy, password] = row.split(':');
  const [range, character] = policy.split(' ');
  const [min, max] = range.split('-');

  return { password, character, min, max };
}

const isPasswordValid = ({ password, character, min, max }) => {
  const matches = password.match(new RegExp(character, 'g'));

  if (matches == null && min > 0) return false;
  return (matches.length >= min && matches.length <= max);
};

const first = (input) => {
  return input.reduce((n, record) => n + (+(isPasswordValid(collectPasswordInfo(record)))), 0);
}

console.log('nr of valid passwords', first(input));
