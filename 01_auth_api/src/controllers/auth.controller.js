const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

class AuthController {
  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration failed: " + errors.errors[0].msg });
      }

      const { email, password } = req.body;
      const userData = await authService.signUp(email, password);

      res.status(201).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      res.status(409).json({ success: false, error: error.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await authService.signIn(email, password);

      res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (error) {
      res.status(409).json({ success: false, error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const userId = req.userId;
      const user = await authService.getUser(userId);

      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new AuthController();
