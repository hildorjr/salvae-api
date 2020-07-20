import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from  '../models/user.model';

dotenv.config();

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SALT, {
    expiresIn: '7d',
  });
}

class UserController {

  constructor() { }

  async register(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).send({ error: 'User already registered'});

    else
      user = await User.create(req.body);
      user.password = undefined;

    return res.status(200).send({ user, token: generateToken(user) });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid password or email'});

    user.password = undefined;

    return res.status(200).send({ user, token: generateToken(user) });
  }

}

export default new UserController();
