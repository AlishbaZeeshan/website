import express from "express";
import {displaySubsOnHomePage} from "../controller/application.js";
const router=express.Router();


router.get("/",displaySubsOnHomePage);

export default router;