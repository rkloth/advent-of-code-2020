const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input", "utf-8")
  .split("\n")
  .filter(Boolean)
  .map((x) => +x)
  .sort((a, b) => a - b);
