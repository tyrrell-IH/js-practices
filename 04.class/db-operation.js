import sqlite3 from "sqlite3";
import { runWithPromise, closeWithPromise } from "./promise-based-functions.js";

export class DatabaseOperation {
  constructor() {
    this.open = new sqlite3.Database("./memo.db");
  }
}
