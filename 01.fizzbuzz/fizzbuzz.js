#!/usr/bin/env node

const MAX_COUNT = 20;

for (let count = 1; count <= MAX_COUNT; count++) {
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
