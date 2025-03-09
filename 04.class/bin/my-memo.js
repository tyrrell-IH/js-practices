#!/usr/bin/env node

import minimist from "minimist";
import { MemoApp } from "../lib/memo-app.js";

const main = async () => {
  const argv = minimist(process.argv.slice(2));
  const memoApp = new MemoApp();

  if (argv.r) {
    await memoApp.showMemo();
  } else if (argv.d) {
    await memoApp.deleteMemo();
  } else if (argv.l) {
    await memoApp.listMemos();
  } else {
    await memoApp.createMemo();
  }
};

await main();
