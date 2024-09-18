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
