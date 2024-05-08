import jwt from 'jsonwebtoken'



export const verifyUsrToken = async (req, res, next) => {

  const { userJWT } = req.cookies;
  if (!userJWT) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try { 

    // Verify the token with the secret key
    const decoded = jwt.verify(userJWT, process.env.JWT_SECRET);
    next()
    
  } catch (error) {
    console.error("Error while verifying the user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
