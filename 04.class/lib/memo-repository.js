export class MemoRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async loadAll() {
    return await this.#db.loadAll();
  }
}
