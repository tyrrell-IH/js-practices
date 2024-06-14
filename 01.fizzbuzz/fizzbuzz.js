#!/usr/bin/env node

const LAST_NUMBER = 20;

for (let count = 1; count <= LAST_NUMBER; count++) {
  if (count % 3 === 0 && count % 5 === 0) {
    console.log("FizzBuzz");
  } else if (count % 3 === 0) {
    console.log("Fizz");
  } else if (count % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(String(count));
  }
}
