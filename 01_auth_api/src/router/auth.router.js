const { check } = require('express-validator');
const controller = require('../controllers/auth.controller');
const validateToken = require('../utils/validateToken');
const router = require('express').Router();

router.post(
  '/auth/sign-up',
  [
    check('email', "Wrong format of email").isEmail(),
    check('password', 'Password must be longer than 4 and shorter than 30 symbols').isLength({ min: 4, max: 30 }),
  ],
  controller.signUp
);
router.post('/auth/sign-in', controller.signIn);
router.get('/me', validateToken, controller.getUser);

module.exports = router;
