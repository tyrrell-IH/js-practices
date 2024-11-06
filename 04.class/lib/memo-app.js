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

  async showMemo() {
    const memos = await this.#memoRepository.loadAll();
    const memoId = await this.#ui.fetchId(memos, "see");
    const memo = await this.#memoRepository.load(memoId);
    this.#ui.showDetail(memo);
  }

  async deleteMemo() {
    const memos = await this.#memoRepository.loadAll();
    const memoId = await this.#ui.fetchId(memos, "delete");
    await this.#memoRepository.delete(memoId);
  }
}
