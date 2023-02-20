require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const router = require('./app/routers');

const port = process.env.PORT || 5000;
//ajout des cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
