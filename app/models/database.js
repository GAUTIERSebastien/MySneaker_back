// const { Client } = require('pg');
// require('dotenv').config();

// const client = new Client({
//   dialect: 'postgres',
//   database: process.env.PGDATABASE,
//   host: process.env.HOSTDB,
//   port: process.env.DBPORT,
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     keepAlive: true,
//   },
// });

// client.connect();

// module.exports = client;

// In db.js
const { Pool } = require('pg');

// The secret connection string you copied earlier
const connectionString = 'postgresql://postgres:NSDWTbHkHbzTHmtm5pOA@containers-us-west-137.railway.app:5650/railway';

const pool = new Pool({
  connectionString,
});

module.exports = pool;
