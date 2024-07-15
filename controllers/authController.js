import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';
import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';

let model = initModels(sequelize)

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = await model.nguoi_dung.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.nguoi_dung.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

export { register, login };
