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
    await this.#memoRepository.close();
  }

  async listMemos() {
    const memos = await this.#memoRepository.loadAll();
    if (memos.length === 0) {
      console.log("No memos yet. Add a memo first.");
      return;
    }
    this.#ui.showAll(memos);
    await this.#memoRepository.close();
  }

  async showMemo() {
    const memos = await this.#memoRepository.loadAll();
    if (memos.length === 0) {
      console.log("No memos yet. Add a memo first.");
      return;
    }
    const memoId = await this.#ui.selectMemo(memos, "see");
    const memo = await this.#memoRepository.load(memoId);
    this.#ui.showDetail(memo);
    await this.#memoRepository.close();
  }

  async deleteMemo() {
    const memos = await this.#memoRepository.loadAll();
    if (memos.length === 0) {
      console.log("No memos yet. Add a memo first.");
      return;
    }
    const memoId = await this.#ui.selectMemo(memos, "delete");
    await this.#memoRepository.delete(memoId);
    await this.#memoRepository.close();
  }
}
