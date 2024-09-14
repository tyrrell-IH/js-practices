import sqlite3 from "sqlite3";
import {
  runWithPromise,
  getWithPromise,
  closeWithPromise,
} from "./promise-based-function.js";

const db = new sqlite3.Database(":memory:");

const executeWithoutError = async (db) => {
  await runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  const insertResult = await runWithPromise(
    db,
    "INSERT INTO books(title) VALUES ('蟹工船')",
  );
  console.log(`id: ${insertResult.lastID}`);
  const row = await getWithPromise(
    db,
    "SELECT * FROM books WHERE title = '蟹工船'",
  );
  console.log(`id: ${row.id} title: ${row.title}`);
  await runWithPromise(db, "DROP TABLE books");
};

const executeWithError = async (db) => {
  await runWithPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    await runWithPromise(db, "INSERT INTO books(title) VALUES (NULL)");
  } catch (error) {
    if (error instanceof Error && error.code === "SQLITE_CONSTRAINT") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  try {
    await getWithPromise(db, "SELECT * FROM bookoff");
  } catch (error) {
    if (error instanceof Error && error.code === "SQLITE_ERROR") {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  await runWithPromise(db, "DROP TABLE books");
  await closeWithPromise(db);
};

await executeWithoutError(db);
await executeWithError(db);
