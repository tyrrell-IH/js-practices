import sqlite3 from "sqlite3";
import timers from "timers/promises";
import { runPromise, getPromise } from "./promise-based-function.js";

const db = new sqlite3.Database(":memory");

const runWithoutError = (db) => {
  runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  )
    .then(() => runPromise(db, "INSERT INTO books(title) values ('蟹工船')"))
    .then((value) => {
      console.log(`id: ${value.lastID}`);
      return getPromise(db, "SELECT * FROM books WHERE title = '蟹工船' ");
    })
    .then((row) => console.log(`id: ${row.id} title: ${row.title}`))
    .then(() => runPromise(db, "DROP TABLE books"));
};

const runWithError = (db) => {
  runPromise(
    db,
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
  )
    .then(() => runPromise(db, "INSERT INTO books(title) values (null)"))
    .catch((error) => console.log(error.message))
    .then(() => getPromise(db, "SELECT * FROM bookoff "))
    .catch((error) => console.log(error.message))
    .finally(() => runPromise(db, "DROP TABLE books"));
};

runWithoutError(db);
await timers.setTimeout(100);
runWithError(db);
