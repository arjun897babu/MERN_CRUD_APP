import express from 'express'
import { createUser, imageUpload, login, logout } from "../controller/user.js"
import { upload } from '../utils/multer.js'

const userRoutes = express.Router()

//api
userRoutes.post('/signUp', createUser) //for creating new user
userRoutes.post('/login', login) // for user login
userRoutes.post('/logout', logout)// for user logout

userRoutes.put('/upload',upload.single('image'),imageUpload)// for uploading the image

export default userRoutes