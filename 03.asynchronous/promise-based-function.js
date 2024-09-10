export const runPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) => {
    db.run(sqlStatement, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });

export const getPromise = (db, sqlStatement) =>
  new Promise((resolve, reject) =>
    db.get(sqlStatement, (error, row) => {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    }),
  );
