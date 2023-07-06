const express = require("express");
const dotenv = require("dotenv");
const urlRouter = require("./routes/router");

const PORT = 3000;
dotenv.config();

const app = express();
app.use(express.json());

app.use("/", urlRouter);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
