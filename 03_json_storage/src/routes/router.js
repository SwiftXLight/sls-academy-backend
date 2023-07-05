const express = require('express');
const router = express.Router();
const { update, retrieve } = require('../controllers/controller');

router.put('/:json_path', update);
router.get('/:json_path', retrieve);

module.exports = router;
