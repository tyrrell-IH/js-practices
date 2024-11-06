export class MemoRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async create(memoParams) {
    await this.#db.insert(memoParams);
  }

  async loadAll() {
    return await this.#db.loadAll();
  }
}
