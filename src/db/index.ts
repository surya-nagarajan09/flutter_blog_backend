const mysql = require("mysql");

// create connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "flutter",
});

db.connect(() => {
  console.log("connected");
});

export default db;
