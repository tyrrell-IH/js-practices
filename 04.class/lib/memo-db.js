import sqlite3 from "sqlite3";
import { run, get, all, close } from "./promise-based-functions.js";

export class MemoDB {
  #db = new sqlite3.Database("./memo.db");

  async #createTable() {
    return await run(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
  }

  async insert(memoParams) {
    await this.#createTable();
    return await run(this.#db, "INSERT INTO memos(body) VALUES(?)", [
      memoParams,
    ]);
  }

  async loadAll() {
    await this.#createTable();
    return await all(this.#db, "SELECT * FROM memos");
  }

  async selectById(memoId) {
    return await get(this.#db, "SELECT * FROM memos WHERE id = ?", [memoId]);
  }

  async delete(id) {
    return await run(this.#db, "DELETE FROM memos WHERE id = ?", [id]);
  }

  async close() {
    return await close(this.#db);
  }
}
