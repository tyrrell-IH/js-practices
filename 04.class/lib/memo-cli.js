import readline from "readline";

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
}
