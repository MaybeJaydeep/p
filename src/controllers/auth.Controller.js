import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/token.util.js";

export const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false
    })
    .json({ accessToken });
};
