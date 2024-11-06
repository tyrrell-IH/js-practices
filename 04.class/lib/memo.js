export class Memo {
  #memoParam;

  constructor(memoParam) {
    this.#memoParam = memoParam;
  }

  async save(db) {
    await db.insert(this.#memoParam);
  }
}
