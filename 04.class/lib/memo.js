import { MemoDB } from "./memoDB.js";
import { SelectableList } from "./selectable-list.js";

export class Memo {
  #memoDB = new MemoDB();

  async add(lines) {
    await this.#memoDB.insert(lines);
    return this.#memoDB.close();
  }

  async #hasAnyMemos() {
    const memos = await this.#memoDB.selectAll();
    if (memos.length !== 0) {
      return memos;
    } else {
      console.log("No memos yet. Add a memo first.");
      return false;
    }
  }

  async showTitles() {
    const memos = await this.#hasAnyMemos();
    if (memos) {
      memos.forEach((memo) => {
        const title = memo.body.split("\n")[0];
        console.log(title);
      });
    }
    return this.#memoDB.close();
  }

  #selectFromList(memos, instruction) {
    const list = new SelectableList(memos, instruction);
    return list.selecteMemo();
  }

  async showFull() {
    const memos = await this.#hasAnyMemos();
    if (memos) {
      const memoID = await this.#selectFromList(memos, "see");
      const selectedMemo = await this.#memoDB.selectByID(memoID);
      console.log(selectedMemo.body);
    }
    return this.#memoDB.close();
  }

  async delete() {
    const memos = await this.#hasAnyMemos();
    if (memos) {
      const memoID = await this.#selectFromList(memos, "delete");
      await this.#memoDB.delete(memoID);
    }
    return this.#memoDB.close();
  }
}
