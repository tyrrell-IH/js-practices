export const runPromise = (db, sqlQuery) =>
  new Promise((resolve, reject) => {
    db.run(sqlQuery, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });

export const getPromise = (db, sqlQuery) =>
  new Promise((resolve, reject) =>
    db.get(sqlQuery, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );
