import express from 'express'
import { createUser, login, logout } from "../controller/user.js"

const userRoutes = express.Router()

//api
userRoutes.post('/signUp', createUser) //for creating new user
userRoutes.post('/login', login) // for user login
userRoutes.post('/logout', logout)// for user logout

export default userRoutes