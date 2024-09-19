import sqlite3 from "sqlite3";
import { allWithPromise, closeWithPromise } from "./promise-based-functions.js";

const showTitles = async () => {
  const db = new sqlite3.Database("./memo.db");
  const memos = await allWithPromise(db, "SELECT * FROM memos");
  memos.forEach((memo) => {
    const title = memo.body.split("\n")[0];
    console.log(title);
  });
  await closeWithPromise(db);
};

showTitles();
