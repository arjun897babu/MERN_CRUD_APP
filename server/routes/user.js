import express from 'express'
import { createUser, imageUpload, login, logout, singleUserDetails, updateUser } from "../controller/user.js"
import { upload } from '../utils/multer.js'

const userRoutes = express.Router()

//api
userRoutes.post('/signUp', createUser) //for creating new user
userRoutes.post('/login', login) // for user login
userRoutes.post('/logout', logout)// for user logout

userRoutes.put('/upload/:userId',upload.single('image'),imageUpload)// for uploading the image

userRoutes.get('/getSingleUser/:userId',singleUserDetails) // for get a single user details
userRoutes.put('/updateUser/:userId',updateUser) //for updating user details

export default userRoutes