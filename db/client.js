const { Client } = require("pg");

let client = new Client(
  process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "postgres",
        database: "techkb",
      }
);

module.exports = client;
