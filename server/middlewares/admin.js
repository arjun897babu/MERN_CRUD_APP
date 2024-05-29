import jwt from 'jsonwebtoken'

const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS
}

export const verifyAdminToken = async (req, res, next) => {

  const { adminJWT } = req.cookies;
  if (!adminJWT) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  try { 

    // Verify the token with the secret key
    const decoded = jwt.verify(adminJWT, process.env.JWT_SECRET);
    if (admin.email !== decoded.adminId) return res.status(401).json({ error: "Access denied" });
    
    next()
    
  } catch (error) {
    console.error("Error while verifying the user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
