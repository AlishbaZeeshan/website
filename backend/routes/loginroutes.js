import express from "express";
import {postLoginCredentials} from "../controller/application.js";
const router=express.Router();

router.post("/",postLoginCredentials);

export default router;