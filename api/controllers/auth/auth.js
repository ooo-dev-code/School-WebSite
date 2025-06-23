import User from "../../models/user.js";
import validator from "validator"
import bcrypt from 'bcryptjs'

import { createToken } from "../../middleware/token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

    try {
        
        if (!email || !password) {
          throw Error("Email, and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw Error('Incorrect email or password');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw Error('Incorrect email or password');
        } 

        const token = createToken(user._id);
        const { password: _, ...userData } = user._doc;

        res.cookie("accessToken", token, {
          httpOnly: true,
        }).status(200).json(userData);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")

}

export const register = async (req, res) => {
  const { username, email, password, type, subject, classes, grades } = req.body;

  try {
    if (!username || !email || !password) {
      throw Error("Username, email, and password are required");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    const exists = await User.findOne({ username });
    if (exists) {
      throw Error("Username already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hash,
      type: type || "Student",
      subject: subject || "",
      classes: classes || [],
      grades: grades || [],
    });

    const token = createToken(user._id);
    const { password: _, ...userData } = user._doc;

    res.cookie("accessToken", token, {
      httpOnly: true,
    }).status(200).json(userData);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};