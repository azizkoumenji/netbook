import mysql2 from "mysql2";
import { readFileSync } from "fs";

const db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  ssl: {
    ca: readFileSync("./db-ca-certificate/ca.pem"),
  },
  database: "netbook",
});

export default db;
