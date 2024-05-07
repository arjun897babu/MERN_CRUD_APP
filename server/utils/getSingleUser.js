import { User } from "../model/userModel.js";
import mongoose from "mongoose";


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

    console.log(user);

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
