import { MemoDB } from "./memo-db.js";
import { SelectableList } from "./selectable-list.js";

export class Memo {
  #memoDB = new MemoDB();

  async add(lines) {
    await this.#memoDB.insert(lines);
    return await this.#memoDB.close();
  }

  async titles() {
    const memos = await this.#memoDB.selectAll();
    const titles = memos.map((memo) => memo.body.split("\n")[0]).join("\n");
    await this.#memoDB.close();
    return titles;
  }

  async #selectFromList(instruction) {
    const memos = await this.#memoDB.selectAll();
    if (memos.length === 0) {
      return null;
    } else {
      const list = new SelectableList(memos, instruction);
      return await list.selectMemo();
    }
  }

  async full() {
    const memoID = await this.#selectFromList("see");
    if (memoID === null) {
      return null;
    } else {
      const selectedMemo = await this.#memoDB.selectByID(memoID);
      await this.#memoDB.close();
      return selectedMemo.body;
    }
  }

  async delete() {
    const memoID = await this.#selectFromList("delete");
    if (memoID === null) {
      return null;
    } else {
      await this.#memoDB.delete(memoID);
      await this.#memoDB.close();
    }
  }
}
