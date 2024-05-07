import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//creating a new user
export const createUser = async (req, res, next) => {

  const { name, email, password } = req.body

  try {

    const hasedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name: name,
      email: email,
      password: hasedPassword
    })

    await newUser.save();
    res.status(200).json({
      message: 'user created successfully'
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

export const imageUpload = (req, res, next) => {
  try {
   
    const image = req.file.filename;  
     
    if (image) {
      res.status(200).json({ message: "File uploaded successfully", filename: image });
    } else {
      res.status(400).json({ message: 'Image is not uploaded' });  
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: `Error in upload image: ${error.message}` });
  }
}
