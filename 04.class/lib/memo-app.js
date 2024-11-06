import { Memo } from "./memo.js";
import { MemoCLI } from "./memo-cli.js";
import { MemoDB } from "./memo-db.js";
import { MemoRepository } from "./memo-repository.js";

export class MemoApp {
  #ui = new MemoCLI();
  #memoRepository = new MemoRepository(new MemoDB());

  async createMemo() {
    const memoParams = await this.#ui.inputMemo();
    const memo = new Memo(memoParams);
    await memo.save(this.#memoRepository);
  }

  async listMemos() {
    const memos = await this.#memoRepository.loadAll();
    this.#ui.showAll(memos);
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
