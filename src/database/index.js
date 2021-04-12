const sqlite3 = require("sqlite3").verbose();

const { dbName } = require("../config.js");

const db = new sqlite3.Database(`./${dbName}`, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to sqlite database.");
});

db.serialize(async () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS buyers (id INTEGER PRIMARY KEY ASC, email TEXT, tokenId INTEGER, name TEXT, hash TEXT)"
  );
});

module.exports = db;
