#!/usr/bin/env node

import minimist from "minimist";

const main = () => {
  const today = new Date();
  const argv = minimist(process.argv.slice(2));
  const year = argv["y"] || today.getFullYear();
  const month = argv["m"] || today.getMonth() + 1;
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  displayHeader(year, month);
  displayBlankSpaces(firstDate);
  displayDays(firstDate, lastDate);
  console.log("\n");
};

const displayHeader = (year, month) => {
  const header = `      ${month}月 ${year}\n日 月 火 水 木 金 土`;
  console.log(header);
};

const displayBlankSpaces = (firstDate) => {
  const blankSpacesNumber = firstDate.getDay();
  for (let n = 1; n <= blankSpacesNumber; n++) {
    process.stdout.write("   ");
  }
};

const displayDays = (firstDate, lastDate) => {
  for (const day = firstDate; day <= lastDate; day.setDate(day.getDate() + 1)) {
    const formattedDay = String(day.getDate()).padStart(2);
    const separator = day.getDay() === 6 ? "\n" : " ";
    process.stdout.write(`${formattedDay}${separator}`);
  }
};

main();
