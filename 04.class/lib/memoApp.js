import { Memo } from "./memo.js";

export class MemoApp {
  #memoObj = new Memo();

  async add(lines) {
    await this.#memoObj.add(lines);
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
    if (await this.#memoObj.hasMemo()) {
      const fullMemo = await this.#memoObj.full();
      console.log(fullMemo);
    } else {
      console.log("No memos yet. Add a memo first.");
    }
  }

  async delete() {
    if (await this.#memoObj.hasMemo()) {
      await this.#memoObj.delete();
    } else {
      console.log("No memos yet. Add a memo first.");
    }
  }
}
