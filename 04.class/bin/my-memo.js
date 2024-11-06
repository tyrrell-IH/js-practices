#!/usr/bin/env node

import minimist from "minimist";
import { MemoApp } from "../lib/memo-app.js";

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  const memoApp = new MemoApp();

  if (argv.r) {
    await memoApp.showFullMemo();
  } else if (argv.d) {
    await memoApp.delete();
  } else if (argv.l) {
    await memoApp.listMemos();
  } else {
    await memoApp.createMemo();
  }
};

await main();
