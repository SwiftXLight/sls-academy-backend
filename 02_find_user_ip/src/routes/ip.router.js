const express = require("express");
const IPController = require("../controllers/ip.controller");

const router = express.Router();

function createIPRoutes(ipService) {
  const ipController = new IPController(ipService);

  router.get("/", ipController.getIPInfo.bind(ipController));

  return router;
}

module.exports = createIPRoutes;
