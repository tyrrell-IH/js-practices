import sqlite3 from "sqlite3";
import { run, get, all, close } from "./promise-based-functions.js";

export class DBOperation {
  constructor() {
    this.db = new sqlite3.Database("./memo.db");
  }

  async insert(text) {
    await run(
      this.db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
    return await run(this.db, "INSERT INTO memos(body) VALUES(?)", [
      text.join("\n"),
    ]);
  }

  selectAll() {
    return all(this.db, "SELECT * FROM memos");
  }

  selectByID(id) {
    return get(this.db, "SELECT * FROM memos WHERE id = ?", [id]);
  }

  delete(id) {
    return run(this.db, "DELETE FROM memos WHERE id = ?", [id]);
  }

  disconnect() {
    return close(this.db);
  }
}
