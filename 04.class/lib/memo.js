export class Memo {
  #lines;

  constructor(lines) {
    this.#lines = lines;
  }

  async save(db) {
    await db.insert(this.#lines);
  }
}
