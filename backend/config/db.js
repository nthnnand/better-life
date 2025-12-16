const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "betterlife"
});

db.getConnection((err) => {
  if (err) {
    console.log("MySQL Connection Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;