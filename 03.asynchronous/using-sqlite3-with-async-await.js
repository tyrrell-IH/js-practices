import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { runPromise, getPromise } from "./promise-based-function.js";

const db = new sqlite3.Database(":memory");

const noeErrorAsyncAwait = async (db) => {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  );
  const insertResult = await runPromise(
    db,
    "INSERT INTO books(title) values ('蟹工船')",
  );
  console.log(`id: ${insertResult.lastID}`);
  const selectedRow = await getPromise(
    db,
    "SELECT * FROM books WHERE title = '蟹工船' ",
  );
  console.log(`id: ${selectedRow.id} title: ${selectedRow.title}`);
  await runPromise(db, "DROP TABLE books");
};

const withErrorAsyncAwait = async (db) => {
  await runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  );
  try {
    await runPromise(db, "INSERT INTO books(title) values (null)");
  } catch (error) {
    console.error(error.message);
  }
  try {
    await getPromise(db, "SELECT * FROM bookoff");
  } catch (error) {
    console.error(error.message);
  }
  await runPromise(db, "DROP TABLE books");
};

noeErrorAsyncAwait(db);
await timers.setTimeout(100);
withErrorAsyncAwait(db);
