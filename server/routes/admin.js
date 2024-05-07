import { adminLogin, adminLogout } from "../controller/admin.js";
import { Admin } from "../model/adminModel.js";
import express from 'express'

const adminRoutes = express.Router();

adminRoutes.post('/login',adminLogin)//admin login
adminRoutes.post('/logout',adminLogout)//admin logout


export default adminRoutes