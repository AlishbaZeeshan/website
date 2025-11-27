import express from  "express";
import { gettingname} from "../controller/application.js";
const router=express.Router();

router.get("/",gettingname);

export default router;