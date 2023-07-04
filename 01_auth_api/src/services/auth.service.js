const supabase = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
  async signUp(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const { error: insertError } = await supabase
        .from('users')
        .insert({ email, password: hashedPassword });

      if (insertError) {
        console.error(insertError);
        throw new Error('Failed to register user');
      }

      const { data, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

      if (selectError) {
        throw new Error('Failed to retrieve user data');
      }
      if (!data || data.length === 0) {
        throw new Error('User data not found');
      }

      const user = data[0];
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_TTL }
      );
      const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return {
        id: user.id,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signIn(email, password) {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (error || !users.length) {
        throw new Error('Invalid email');
      }

      const user = users[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_TTL }
      );
      const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return {
        id: user.id,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUser(userId) {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('id, email')
        .eq('id', userId)
        .limit(1);

      if (error || !users.length) {
        throw new Error('User not found');
      }

      const user = users[0];

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new AuthService();
