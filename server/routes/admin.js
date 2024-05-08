import { addUser, adminLogin, adminLogout, allUserDetails, deleteUser, getSingleUser, imageUpload, updateUser } from "../controller/admin.js";
import { Admin } from "../model/adminModel.js";
import express from 'express'
import { upload } from "../utils/multer.js";
import { verifyAdminToken } from "../middlewares/admin.js";

const adminRoutes = express.Router();

adminRoutes.get('/allUser',verifyAdminToken, allUserDetails) // get all the details of the user
adminRoutes.get('/getSingleUser/:userId',getSingleUser) // for fetching the single details of user

adminRoutes.post('/login', adminLogin)//admin login
adminRoutes.post('/logout', adminLogout)//admin logout
adminRoutes.post('/addUser', addUser)//for creating a new user

adminRoutes.put('/upload/:userId',verifyAdminToken,upload.single('image'),imageUpload)//for updating the user profile picture
adminRoutes.put('/updateUser/:userId',verifyAdminToken,updateUser)//update user details

adminRoutes.delete('/delete/:userId',verifyAdminToken, deleteUser) //delete user from databse


export default adminRoutes