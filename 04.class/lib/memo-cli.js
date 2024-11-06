import readline from "readline";
import { Menu } from "./menu.js";

export class MemoCLI {
  constructor() {}

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

  async fetchId(memos, instruction) {
    const menu = new Menu(memos, instruction);
    return await menu.fetchId();
  }

  showAll(memos) {
    const titles = memos.map((memo) => memo.body.split("\n")[0]).join("\n");
    console.log(titles);
  }

  showDetail(memo) {
    console.log(memo.body);
  }
}
