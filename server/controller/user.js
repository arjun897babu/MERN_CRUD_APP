import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createNewUser, singleUser, updateUserDetails, uploadProfilePic } from "../utils/getSingleUser.js"


//creating a new user
export const createUser = async (req, res, next) => {

  const { name, email, password } = req.body

  try {

    const { status, message } = await createNewUser(name, email, password);
    
    res.status(200).json({
      status,
      message
    })

  } catch (error) {
    console.log(`error in creating user : ${error.message}`)
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email already in use'
      });
    }
    res.status(500).json({
      message: `error while creating user :${error.message}`
    })
  }
}

//user login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {

    const existingUser = await User.findOne({ email });

    if (!existingUser) {

      return res.status(404).json({
       message: 'User not found'
      });
    }


    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {

      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Set a cookie with the JWT
    res.cookie('userJWT', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    })
      .status(200)
      .json({
        message: "User logged in successfully",
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name
        }
      });

  } catch (error) {

    console.error(`Error in user login: ${error.message}`);
    res.status(500).json({
      message: `error while logging in  :${error.message}`
    })
    // next(error) 
  }
}

///user logout

export const logout = async (req, res) => {
  try {

    res.clearCookie('userJWT', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    })
      .status(200)
      .json({ message: 'user logout' })

  } catch (error) {
    console.error(`error in user logout : ${error.message}`)
    res.status(500).json({
      message: `error in user logout ${error.message}`
    })
  }
}

//upload profile pic
export const imageUpload = async (req, res, next) => {
  try {

    const { userId } = req.params
    const { filename } = req.file
    const { status, message, imagePath } = await uploadProfilePic(userId, filename)

    if (!imagePath) return res.status(401).json(
      {
        status,
        message
      }
    )
    else return res.status(200).json(
      {
        status,
        message,
        imagePath
      }
    )

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Error in upload image: ${error.message}` });
  }
}


//get singleUserDetails
export const singleUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params
    const userDetails = await singleUser(userId)
    
    res.status(200).json({
      userDetails
    })

  } catch (error) {
    console.log(`error in usersingle detail page : ${error.message}`)
  }
}

//update user details
export const updateUser = async (req, res, next) => {

  const { userId } = req.params
  const { name, email } = req.body
  try {
    const { status, message } = await updateUserDetails(userId, name, email)
    
    if(status==='error') return res.status(409).json({message})

    if (status === 'success') res.status(200).json(
      {
        message,
        status
      }
    )
    else res.status(400).json(
      {
        message,
        status
      }
    )

  } catch (error) {
    console.log(`error in updating user : ${error.message}`)
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Email already in use'
      });
    }
    //next(error)
  }
}