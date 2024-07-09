#!/usr/bin/env node

import minimist from "minimist";

const main = () => {
  const today = new Date();
  const argv = minimist(process.argv.slice(2));
  const year = argv["y"] || today.getFullYear();
  const month = argv["m"] || today.getMonth() + 1;
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  displayHeader(year, month);
  displayBlankSpaces(firstDay);
  displayDays(firstDay, lastDay);
  displayFooter();
};

const displayHeader = (year, month) => {
  const header = `      ${month}月 ${year}\n日 月 火 水 木 金 土`;
  console.log(header);
};

const displayBlankSpaces = (firstDay) => {
  const blankSpacesNumber = firstDay.getDay();
  for (let number = 1; number <= blankSpacesNumber; number++) {
    process.stdout.write("   ");
  }
};

const displayDays = (firstDay, lastDay) => {
  for (const day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    const formattedDay = String(day.getDate()).padStart(2);
    const separator = day.getDay() === 6 ? "\n" : " ";
    process.stdout.write(`${formattedDay}${separator}`);
  }
};

const displayFooter = () => {
  const footer = `\n`;
  console.log(footer);
};

main();
