const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  database: process.env.PGDATABASE,
});

client.connect();

module.exports = client;