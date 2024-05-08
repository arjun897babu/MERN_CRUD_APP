import { User } from "../model/userModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//get single user details
export const singleUser = async (userId) => {
  try {

    const [user] = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project: { password: 0 }
      }
    ]);

    return user

  } catch (error) {
    throw error
  }
}

//get all user details 
export const allUser = async () => {
  try {
    return await User.aggregate(
      [
        {
          $match: {}
        },
        {
          $project: {
            password: 0
          }
        }

      ]
    )
  } catch (error) {
    throw error
  }
}

//for creating a new user
export const createNewUser = async (name, email, password) => {

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });


    await newUser.save();

    return {
      status: 'success',
      message: 'User created successfully'
    };
  } catch (error) {
    throw error
  }
}

//update user
export const updateUserDetails = async (userId, name, email) => {
  try {

    const updateUser = await User.findByIdAndUpdate(userId,
      { name, email },
      { new: true }
    )

    if (!updateUser) return { status: 'success', message: 'updation failed' }
    else return { status: 'success', message: 'user details updated' }

  } catch (error) {
    throw error
  }
}


//upload profile picture
export const uploadProfilePic = async (userId, fileName) => {
  try {
    const PORT = process.env.PORT || 8080
    
    const imageUrl = `http://localhost:${PORT}/public/${fileName}`;

    if (imageUrl) {
      const currentUser = await User.findByIdAndUpdate(
        userId,
        { image: imageUrl },
        { new: true }
      );
      return { status: 'success', message: "File uploaded successfully", imagePath: imageUrl }
    } else {
      return { status: 'failed', message: 'Image is not uploaded' }
    }
  } catch (error) {
    throw error
  }
} 