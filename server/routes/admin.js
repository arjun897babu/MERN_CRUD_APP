import { addUser, adminLogin, adminLogout, allUserDetails, deleteUser } from "../controller/admin.js";
import { Admin } from "../model/adminModel.js";
import express from 'express'

const adminRoutes = express.Router();

adminRoutes.post('/login', adminLogin)//admin login
adminRoutes.post('/logout', adminLogout)//admin logout
adminRoutes.post('/addUser', addUser)//for creating a new user

adminRoutes.get('/allUser', allUserDetails) // get all the details of the user
adminRoutes.delete('/delete/:userId', deleteUser) //delete user from databse


export default adminRoutes