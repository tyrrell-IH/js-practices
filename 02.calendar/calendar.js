#!/usr/bin/env node

const firstDay = new Date(2024, 6, 1);
const lastDay = new Date(2024, 7, 0);
const blankSpacesNumber = firstDay.getDay();

const main = () => {
  displayHeader(2024, 7);
  displayBlankSpaces();
  displayDays();
  displayFooter();
};

const displayHeader = (year, month) => {
  const header = `      ${month}月 ${year}\n日 月 火 水 木 金 土`;
  console.log(header);
};

const displayBlankSpaces = () => {
  const blankSpaces = [];
  for (let number = 1; number <= blankSpacesNumber; number++) {
    blankSpaces.push("  ");
  }
  process.stdout.write(blankSpaces.join(" "));
};

const displayDays = () => {
  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    if (day.getDay() === 0) {
      process.stdout.write(`${day.getDate()}`.padStart(2));
    } else if (day.getDay() === 6) {
      console.log(`${day.getDate()}`.padStart(3));
    } else {
      process.stdout.write(`${day.getDate()}`.padStart(3));
    }
  }
};

const displayFooter = () => {
  const footer = `\n`;
  console.log(footer);
};

main();
