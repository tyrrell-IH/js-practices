import sqlite3 from "sqlite3";
import { run, get, all, close } from "./promise-based-functions.js";

export class MemoDB {
  #db = new sqlite3.Database("./memo.db");

  #createTable() {
    return run(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
  }

  async insert(lines) {
    await this.#createTable();
    return run(this.#db, "INSERT INTO memos(body) VALUES(?)", [
      lines.join("\n"),
    ]);
  }

  async selectAll() {
    await this.#createTable();
    return all(this.#db, "SELECT * FROM memos");
  }

  selectByID(id) {
    return get(this.#db, "SELECT * FROM memos WHERE id = ?", [id]);
  }

  delete(id) {
    return run(this.#db, "DELETE FROM memos WHERE id = ?", [id]);
  }

  close() {
    return close(this.#db);
  }
}
