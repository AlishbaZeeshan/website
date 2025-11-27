import express from "express";
import { getUserProfile,deleteUserByUser,UpdateUserByUserData } from "../controller/application.js";


const router = express.Router();

// GET logged-in user's full profile
router.get("/",  getUserProfile);
router.delete("/",deleteUserByUser);
router.put("/",UpdateUserByUserData);

export default router;
