import { User } from "../model/userModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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


export const createNewUser =async (name,email,password) =>{

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