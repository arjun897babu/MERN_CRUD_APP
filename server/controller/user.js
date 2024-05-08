import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createNewUser, singleUser } from "../utils/getSingleUser.js"


//creating a new user
export const createUser = async (req, res, next) => {

  const { name, email, password } = req.body

  try {

    const { status, message } = await createNewUser(name, email, password);
    res.status(200).json({
      status,
      message
    })

    await newUser.save();
    res.status(200).json({
      status,
      message
    })

  } catch (error) {
    console.log(`error in creating user : ${error.message}`)
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

      return res.status(401).json({
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
    const PORT = process.env.PORT || 8080
    const { userId } = req.params
    const imageUrl = `http://localhost:${PORT}/public/${req.file.filename}`;

    if (imageUrl) {
      const currentUser = await User.findByIdAndUpdate(
        userId,
        { image: imageUrl },
        { new: true }
      );
      res.status(200).json({ message: "File uploaded successfully", filename: imageUrl });
    } else {
      res.status(400).json({ message: 'Image is not uploaded' });
    }
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
    if (!userDetails) return res.status(401).json({ message: 'user not found' })

    res.status(200).json({
      userDetails
    })

  } catch (error) {
    console.log(`error in usersingle detail page : ${error.message}`)
  }
}

//update user details
export const updateUser = async (req, res, next) => {
  try {

    const { userId } = req.params
    const { name, email } = req.body
    
    const updateUser = await User.findByIdAndUpdate(userId, {
      name, email
    }, { new: true })

    if (!updateUser) return res.status(400).json({ message: 'updation failed' })
    res.status(200).json({ message: 'user details updated' })

  } catch (error) {
    console.log(`error in updating user : ${error.message}`)
    //next(error)
  }
}