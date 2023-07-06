const express = require("express");
const { postShortURL, redirectOriginalURL } = require('../controllers/controller');

const router = express.Router();

router.post("/shorten", postShortURL);
router.get("/:linkHash", redirectOriginalURL);

module.exports = router;
