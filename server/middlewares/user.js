import jwt from 'jsonwebtoken'
import { singleUser } from '../utils/getSingleUser.js';
import mongoose from 'mongoose';



export const verifyUsrToken = async (req, res, next) => {
  const { userId } = req.params
  const { userJWT } = req.cookies;
  if (!userJWT) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try {

    // Verify the token with the secret key
    const decoded = jwt.verify(userJWT, process.env.JWT_SECRET);
    if (userId !== decoded.userId) return res.status(401).json({ error: "Access denied" });
    const userDetails = await singleUser(userId)
    if (!userDetails) return res.status(401).json({ error: "Access denied" })  
    if (!userDetails._id.equals(new mongoose.Types.ObjectId(decoded.userId))) return res.status(401).json({ error: "Access denied" });
    
    next()

  } catch (error) {
    console.error("Error while verifying the user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
