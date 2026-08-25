const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { password: userPassword, ...userData } = user;
    res.status(200).json({ message: 'Login successful', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

exports.createUser = async (req, res) => {
  const { email, password, name, role_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name, role_id });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating user' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role_id, password } = req.body;
  try {
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.update(id, { email, name, role_id, password: hashedPassword });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating user' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.delete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting user' });
  }
};
