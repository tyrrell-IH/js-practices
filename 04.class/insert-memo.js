import sqlite3 from "sqlite3";
import readline from "readline";
import { runWithPromise, closeWithPromise } from "./promise-based-functions.js";

const insertMemo = () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  const rl = readline.createInterface({
    input: process.stdin,
  });

  const lines = [];
  rl.on("line", (line) => {
    lines.push(line);
  });

  rl.on("close", async () => {
    const db = new sqlite3.Database("./memo.db");
    await runWithPromise(
      db,
      "CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)",
    );
    await runWithPromise(db, "INSERT INTO memos(body) VALUES(?)", [
      lines.join("\n"),
    ]);
    await closeWithPromise(db);
  });
};

await insertMemo();
