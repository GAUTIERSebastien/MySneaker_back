require('dotenv').config();

const express = require('express');
const router = require('./app/routers');

const port = process.env.PORT || 5000;

const app = express();

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
