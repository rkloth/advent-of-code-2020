/*
  https://adventofcode.com/2020/day/3
*/

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .replace(/\r/g, "")
  .replace(/\n\n/g, "$")
  .replace(/\n/g, "-")
  .replace(/\s/g, "-");

const collectPassport = (passport) => {
  let result = {};
  passport.split("-").forEach((pair) => {
    const [k, v] = pair.split(":");
    if (v != null) result[k] = v;
  });
  return result;
};

const initPassports = (input) => {
  return input.split("$").map((p) => collectPassport(p));
};

const REQUIRED_PASSPORT_FIELDS = [
  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"].sort().join(""),
  ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].sort().join(""),
];

const isValueBetween = (v, a, b) => {
  return v >= a && v <= b;
};

const Validations = {
  byr: (v) => isValueBetween(v, 1920, 2002),
  iyr: (v) => isValueBetween(v, 2010, 2020),
  eyr: (v) => isValueBetween(v, 2020, 2030),
  hgt: (v) => {
    let unit = v.match(/(cm|in)/);
    let value = v.match(/\d+/);

    if (unit != null && value != null) {
      return (
        (unit[0] === "cm" && isValueBetween(value[0], 150, 193)) ||
        (unit[0] === "in" && isValueBetween(value[0], 59, 76))
      );
    }
  },
  hcl: (v) => new RegExp(/^#[0-9a-f]{6}/i).test(v),
  ecl: (v) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v),
  pid: (v) => new RegExp(/^\d{9}$/).test(v),
  cid: (v) => true,
};

const isPassportFieldsPresent = (passport) => {
  return REQUIRED_PASSPORT_FIELDS.includes(Object.keys(passport).sort().join(""));
};

const isPassportDataValid = (passport) => {
  return Object.keys(passport).every((k) => {
    if (Validations.hasOwnProperty(k)) {
      return Validations[k](passport[k]);
    }
    return false;
  });
};

const first = (input) => {
  let passports = initPassports(input);

  return passports.reduce((sum, p) => sum + +isPassportFieldsPresent(p), 0);
};

const second = (input) => {
  let passports = initPassports(input);

  return passports.reduce((sum, p) => sum + +(isPassportFieldsPresent(p) && isPassportDataValid(p)), 0);
};

console.log("solution first", first(input));
console.log("solution second", second(input));
