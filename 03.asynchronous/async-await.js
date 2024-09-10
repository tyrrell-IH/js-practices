import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { runWithPromise, getWithPromise } from "./promise-based-function.js";

const db = new sqlite3.Database(":memory");

const executeWithoutError = async (db) => {
  await runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  );
  const insertResult = await runWithPromise(
    db,
    "INSERT INTO books(title) values ('蟹工船')",
  );
  console.log(`id: ${insertResult.lastID}`);
  const selectedRow = await getWithPromise(
    db,
    "SELECT * FROM books WHERE title = '蟹工船' ",
  );
  console.log(`id: ${selectedRow.id} title: ${selectedRow.title}`);
  await runWithPromise(db, "DROP TABLE books");
};

const executeWithError = async (db) => {
  await runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  );
  try {
    await runWithPromise(db, "INSERT INTO books(title) values (null)");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  try {
    await getWithPromise(db, "SELECT * FROM bookoff");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
  await runWithPromise(db, "DROP TABLE books");
};

executeWithoutError(db);
await timers.setTimeout(100);
executeWithError(db);
