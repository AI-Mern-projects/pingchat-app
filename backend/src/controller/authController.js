import User from "../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res,next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({email});
    if (existing) {
     return  res.status(400).json({ error: "User Already Exists" });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed_password });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ erro: "All fields are required" });
    }
    const exist = await User.findOne({email});
 
    if (!exist) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, exist.password);
       console.log(match)
    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: exist._id}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    res.status(200).json({
      message: "Login Successfully!",
      token,
      user: {
        id: exist._id,
        name: exist.name,
        email: exist.email,
      },
    });
  } catch (error) {
    console.error(error); 
      next(error); 
  }
   
};

export const logout = (req, res) => {
  res.send("login route");
};
