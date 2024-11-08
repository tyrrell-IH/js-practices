import pkg from "enquirer";
import readline from "readline";

const { prompt } = pkg;

export class MemoCLI {
  inputMemo() {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
      });

      const lines = [];
      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", () => {
        if (lines[0].length === 0) {
          lines[0] = "Non Title";
        }
        const memoParams = lines.join("\n");
        resolve(memoParams);
      });
    });
  }

  async selectMemo(memos, instruction) {
    const menu = memos.map((memo) => ({
      value: memo,
      name: memo.body.split(`\n`)[0],
    }));

    const question = {
      type: "select",
      name: "memo",
      message: `Select a memo you want to ${instruction}:`,
      choices: menu,
      result() {
        return this.focused.value;
      },
    };
    const fetchedValue = await prompt(question);
    return fetchedValue.memo;
  }

  showAll(memos) {
    const titles = memos.map((memo) => memo.body.split("\n")[0]).join("\n");
    console.log(titles);
  }

  showDetail(memo) {
    console.log(memo.body);
  }
}
