#!/usr/bin/env node

import minimist from "minimist";
import readline from "readline";
import { MemoApp } from "../lib/memo-app.js";

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
  const memoApp = new MemoApp();

  if (argv.r) {
    await memoApp.showFullMemo();
  } else if (argv.d) {
    await memoApp.delete();
  } else if (argv.l) {
    await memoApp.showTitles();
  } else {
    const lines = await input();
    await memoApp.add(lines);
  }
};

await main();
