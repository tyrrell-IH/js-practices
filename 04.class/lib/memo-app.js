import { Memo } from "./memo.js";
import { MemoCLI } from "./memo-cli.js";
import { MemoDB } from "./memo-db.js";

export class MemoApp {
  #memoDb = new MemoDB();
  #ui = new MemoCLI();

  async createMemo() {
    const lines = await this.#ui.inputMemo();
    const memo = new Memo(lines);
    await memo.save(this.#memoDb);
  }

  async showTitles() {
    const titles = await this.#memoObj.titles();
    if (titles.length !== 0) {
      console.log(titles);
    } else {
      console.log("No memos yet. Add a memo first.");
    }
  }

  async showFullMemo() {
    const fullMemo = await this.#memoObj.full();
    if (fullMemo === null) {
      console.log("No memos yet. Add a memo first.");
    } else {
      console.log(fullMemo);
    }
  }

  async delete() {
    if ((await this.#memoObj.delete()) === null) {
      console.log("No memos yet. Add a memo first.");
    }
  }
}
