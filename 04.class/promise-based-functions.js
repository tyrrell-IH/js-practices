export const runWithPromise = (db, sqlQuery, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sqlQuery, params, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });

export const getWithPromise = (db, sqlQuery) =>
  new Promise((resolve, reject) =>
    db.get(sqlQuery, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );

export const allWithPromise = (db, sqlQuery) =>
  new Promise((resolve, reject) =>
    db.all(sqlQuery, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );

export const closeWithPromise = (db) =>
  new Promise((resolve, reject) =>
    db.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    }),
  );
