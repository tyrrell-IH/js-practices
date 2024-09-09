export const runPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) => {
    db.run(sqlStatement, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

export const getPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) =>
    db.get(sqlStatement, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    }),
  );
