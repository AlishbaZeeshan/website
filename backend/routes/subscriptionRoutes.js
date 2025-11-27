import express from "express";
import {addingSubscription,showingSubscription,deletingSubscription} from "../controller/application.js";
const router=express.Router();


router.post("/",addingSubscription);
router.get("/",showingSubscription);
router.delete("/:id",deletingSubscription);
export default router;