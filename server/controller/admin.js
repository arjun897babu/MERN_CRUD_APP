import { Admin } from "../model/adminModel"
import jwt from 'jsonwebtoken'

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const isAdmin = await Admin.findOne({ email })
    if (!isAdmin) return res.status(401).json({
      message: 'Invalid credential'
    })
    const isValidPassword = isAdmin.password === password

    if (!isValidPassword) return res.status(401).json({
      message: 'Wrong password'
    })

    //create JWT for admin
    const token = jwt.sign(
      { adminId: isAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }

    );

    res.cookie('adminJWT', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
      .status(200)
      .json({
        message: 'admin logged in successfully',
        token,
        admin: isAdmin._id
      })
  } catch (error) {
    console.log(`error in admin Login : ${error.message}`)
    res.status(500).json({
      message: `error while logging in  :${error.message}`
    })
     // next(error) 
  }
}