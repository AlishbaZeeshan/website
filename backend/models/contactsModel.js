import mongoose from "mongoose";

const ContactStructure=mongoose.Schema({
   name:String,
   email:String,
   message:String,
});

const ContactModel=mongoose.model("contacts",ContactStructure);
export default ContactModel;