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
  for (let number = 1; number <= blankSpacesNumber; number++) {
    process.stdout.write("   ");
  }
};

const displayDays = () => {
  for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
    const formattedDay = String(day.getDate()).padStart(2);
    if (day.getDay() === 6) {
      console.log(`${formattedDay}`);
    } else {
      process.stdout.write(`${formattedDay} `);
    }
  }
};

const displayFooter = () => {
  const footer = `\n`;
  console.log(footer);
};

main();
