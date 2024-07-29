import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validate input: both username and email must be provided
    if (!username || !email) {
      return res.status(400).json({ error: 'Both username and email fields are required for update.' });
    }

    // Prepare the update data object
    const updatedUserData = {
      username,
      email
    };

    // Update the user data by ID and return the new document
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ status: 'User updated successfully!', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Delete user by Id
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ status: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
