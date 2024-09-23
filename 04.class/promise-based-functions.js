export const run = (db, sqlQuery, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sqlQuery, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });

export const get = (db, sqlQuery, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sqlQuery, params, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );

export const all = (db, sqlQuery) =>
  new Promise((resolve, reject) =>
    db.all(sqlQuery, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );

export const close = (db) =>
  new Promise((resolve, reject) =>
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    }),
  );
