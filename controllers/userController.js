const User = require('../models/User');

const addUser = async (req, res) => {
  try {
    const { username, phone, email } = req.body;

    if (!username || !phone || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const user = await User.create({ username, phone, email });
    res.status(201).json({
      message: 'User added successfully',
      id: user.id,
    });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addUser, getUsers, deleteUser };
