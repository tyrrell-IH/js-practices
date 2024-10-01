#!/usr/bin/env node

import minimist from "minimist";
import readline from "readline";
import { Memo } from "../lib/memo.js";

const input = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    const lines = [];
    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", () => {
      if (lines[0].length === 0) {
        lines[0] = "Non Title";
      }
      resolve(lines);
    });
  });
};

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  const memo = new Memo();

  if (argv.r) {
    await memo.showFull();
  } else if (argv.d) {
    await memo.delete();
  } else if (argv.l) {
    await memo.showTitles();
  } else {
    const lines = await input();
    await memo.add(lines);
  }
};

await main();
