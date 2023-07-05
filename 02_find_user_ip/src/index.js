const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const IPService = require("./services/ip.service");
const IPRoutes = require("./routes/ip.router");

const app = express();
app.set("trust proxy", true);

async function loadIPData() {
  const ipData = [];

  try {
    const stream = fs.createReadStream("./ip_data.CSV");
    const parser = stream.pipe(csv());

    for await (const row of parser) {
      const from = parseInt(row["0"]);
      const to = parseInt(row["16777215"]);
      const country = row["-"];

      const ipRange = { from, to, country };

      ipData.push(ipRange);
    }

    console.log("CSV file successfully processed.");
    return ipData;
  } catch (error) {
    console.error("Error processing CSV file:", error);
    throw error;
  }
}

(async () => {
  try {
    const ipData = await loadIPData();
    const ipService = new IPService(ipData);
    const ipRouter = IPRoutes(ipService);
    app.use("/", ipRouter);

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error loading IP data:", error);
  }
})();
