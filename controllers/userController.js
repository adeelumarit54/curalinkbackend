import User from "../models/User.js";

// POST - Create user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "User created successfully 🎉", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
