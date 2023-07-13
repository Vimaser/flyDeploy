require('dotenv').config()

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");
const databaseUrl = process.env.DATABASE_URL
console.log(databaseUrl);
const client = new Client({ connectionString: databaseUrl });
client.connect();

app.get("/", async (req, res) => {
  const result = await client.query("select * from movies;");

  res.json(result.rows);
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`))

