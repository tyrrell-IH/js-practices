#!/usr/bin/env node

const LAST_NUMBER = 20;

for (let cnt = 1; cnt <= LAST_NUMBER; cnt++) {
  if (cnt % 3 === 0 && cnt % 5 === 0) {
    console.log("FizzBuzz");
  } else if (cnt % 3 === 0) {
    console.log("Fizz");
  } else if (cnt % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(String(cnt));
  }
}
