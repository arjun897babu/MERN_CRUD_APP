import { Admin } from "../model/adminModel.js"
import jwt from 'jsonwebtoken'
import { User } from '../model/userModel.js'
import { allUser, createNewUser } from "../utils/getSingleUser.js"
const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS
}

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const isAdmin = email === admin.email
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

// list all user 

export const allUserDetails = async (req, res, next) => {
  try {
    const list = await allUser();
    console.log(list)
    if (list.length < 1) {
      return res.status(404).json({ message: 'no user found in database' })
    }

    return res.status(200).json({ message: 'User details successfull', users: list })

  } catch (error) {
    console.log(`error in listing all the user : ${error.message}`)
  }
}

// delete user
export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  console.log('user id in delete', userId)
  try {
    const deletedUser = await User.findByIdAndDelete(userId)
    if (deletedUser) {
      return res.status(200).json({ success: true })
    }
  } catch (error) {
    console.log(error)
  }
}

export const addUser = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const { status, message } = await createNewUser(name, email, password);
    res.status(200).json({
      status,
      message
    })

  } catch (error) {
    console.error(`error in create user on admin side : ${error.message}`)
    res.status(500).json({
      message: `error in create user on admin side ${error.message}`
    })
  }
}