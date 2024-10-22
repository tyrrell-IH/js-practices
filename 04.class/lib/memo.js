import { MemoDB } from "./memoDB.js";
import { SelectableList } from "./selectable-list.js";

export class Memo {
  #memoDB = new MemoDB();

  async hasMemo() {
    const memos = await this.#memoDB.selectAll();
    return memos.length !== 0;
  }

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
    const list = new SelectableList(memos, instruction);
    return await list.selectMemo();
  }

  async full() {
    const memoID = await this.#selectFromList("see");
    const selectedMemo = await this.#memoDB.selectByID(memoID);
    await this.#memoDB.close();
    return selectedMemo.body;
  }

  async delete() {
    const memoID = await this.#selectFromList("delete");
    await this.#memoDB.delete(memoID);
    return await this.#memoDB.close();
  }
}
