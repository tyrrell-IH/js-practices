import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory");

function noErrorCallback() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
    () => {
      db.run("INSERT INTO books(title) values ('蟹工船')", function () {
        console.log(`id: ${this.lastID}`);
        db.get("SELECT * FROM books WHERE title = '蟹工船' ", (error, row) => {
          console.log(`id: ${row.id} title: ${row.title}`);
          db.run("DROP TABLE books");
        });
      });
    },
  );
}

function withErrorCallback() {
  db.run(
    "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE )",
    () => {
      db.run("INSERT INTO books(title) values (null)", (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(`id: ${this.lastID}`);
        }
        db.get("SELECT * FROM bookoff ", (err, row) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(`id: ${row.id} title: ${row.title}`);
          }
        });
      });
    },
  );
}

noErrorCallback();
await timers.setTimeout(100);
withErrorCallback();
