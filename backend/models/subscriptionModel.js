 import mongoose from "mongoose";
const subscriptionStructure=mongoose.Schema({
    planName:String,
    price:String,
    description:String,
    duration:String,
    feature1:String,
    feature2:String,
    feature3:String,
 });
 const subscriptionModel=mongoose.model('subscriptions',subscriptionStructure);
 export default subscriptionModel;