import { Memo } from "./memo.js";
import { MemoDB } from "./memo-db.js";

export class MemoApp {
  #memoDb = new MemoDB();

  async createMemo(lines) {
    const memo = new Memo(lines);
    await memo.save(this.#memoDb);
    await this.#memoDb.close();
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
