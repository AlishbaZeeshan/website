import express from "express";
import {postUsers,seeUsers,editingUser,deletingUser} from "../controller/application.js";
const router=express.Router();

router.post("/",postUsers);
router.get("/",seeUsers);
router.put("/:id",editingUser);
router.delete("/:id",deletingUser);
export default router;