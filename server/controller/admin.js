import { Admin } from "../model/adminModel.js"
import jwt from 'jsonwebtoken'

const admin = {
  email:process.env.ADMIN_EMAIL,
  password:process.env.ADMIN_PASS
}

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const isAdmin = email===admin.email
    if (!isAdmin) return res.status(401).json({
      message: 'Invalid credential'
    })
    const isValidPassword = admin.password === password

    if (!isValidPassword) return res.status(401).json({
      message: 'Wrong password'
    })

    //create JWT for admin
    const token = jwt.sign(
      { adminId: admin.email },
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


export const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie('adminJWT', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    })
      .status(200)
      .json({ message: 'admin logged out successfully' })

  } catch (error) {
    console.error(`error in admin logout : ${error.message}`)
    res.status(500).json({
      message: `error in admin logout ${error.message}`
    })
  }
}