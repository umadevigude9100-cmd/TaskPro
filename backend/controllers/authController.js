import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt"
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register endpoint called");

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser._id, newUser.role);
    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      role: newUser.role 
    });
  } catch (err) {
    console.log("Error in register:", err);
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid user" });
    const mypassword=bcrypt.compare(user.password,password)
    if(!mypassword) return res.json({message:"Invalid password"})
    const token = generateToken(user._id, user.role);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
