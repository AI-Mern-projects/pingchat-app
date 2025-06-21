import jwt from "jsonwebtoken";
import User from "../model/authModel.js";
export const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unauthoried -NO Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized -User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
