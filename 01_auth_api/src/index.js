const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./router/auth.router');

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', authRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
