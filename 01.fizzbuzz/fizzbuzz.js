#!/usr/bin/env node

const Last_Number = 30;

for (let cnt = 1; cnt <= Last_Number; cnt++) {
  if (cnt % 3 === 0 && cnt % 5 === 0) {
    console.log("FizzBuzz");
  } else if (cnt % 3 === 0) {
    console.log("Fizz");
  } else if (cnt % 5 === 0) {
    console.log("Buzz");
  } else console.log(String(cnt));
}
