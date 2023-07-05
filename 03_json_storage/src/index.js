require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const router = require('../src/routes/router');
const port = 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
