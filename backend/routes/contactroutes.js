import express from "express";
import {postingContacts} from "../controller/application.js";
const router=express.Router();

router.post("/",postingContacts);

export default router;