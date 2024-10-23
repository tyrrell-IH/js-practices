import * as util from "node:util";

export async function run(db, sqlQuery, params = []) {
  const promiseRun = util.promisify(db.run).bind(db);
  return await promiseRun(sqlQuery, params);
}

export async function get(db, sqlQuery, params = []) {
  const promiseGet = util.promisify(db.get).bind(db);
  return await promiseGet(sqlQuery, params);
}

export async function all(db, sqlQuery) {
  const promiseAll = util.promisify(db.all).bind(db);
  return await promiseAll(sqlQuery);
}

export async function close(db) {
  const promiseClose = util.promisify(db.close).bind(db);
  return await promiseClose();
}
