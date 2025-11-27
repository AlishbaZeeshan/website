import learnifyApplicationModel from "../models/application.js";
import subscriptionModel from "../models/subscriptionModel.js";
import ContactModel from "../models/contactsModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const postUsers = async (req, res) => {
  console.log("posting....");
  console.log("Received data:", req.body);

  try {
    const {firstName, lastName,email,password,dob,field,education}=req.body;

    const userExist= await learnifyApplicationModel.findOne({email});

    if(userExist){
      return res.json({message:"User already exists"});
    }

    const hashedPassword= await bcrypt.hash(password,10);//what this 10 means
    const newUser = new learnifyApplicationModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      field,
      education,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log( "not saved");

  }
};
export const seeUsers=async (req,res)=>{
 try{
  console.log("Admin fetching users...");
  const users= await learnifyApplicationModel.find();
  res.json(users);
 }catch(error){
   console.log("Not found any data");
 }
};
export const editingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const result = await learnifyApplicationModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", result });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Failed to edit user" });
  }
};

export const deletingUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await learnifyApplicationModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

export const addingSubscription=async(req,res)=>{
  console.log(req.body);
try{
 const newSubscription= new subscriptionModel(req.body);
  const savedSubscription=await newSubscription.save();
  res.json(savedSubscription);
}catch (error){
 console.log("not saved");

}
};
export const showingSubscription=async(req,res)=>{

  try{
  const subscriptions=await subscriptionModel.find();
  res.json(subscriptions);
  }catch(error){
 console.log("subscriptions not found");
  }
};
export const displayingSubscription=async(req,res)=>{

  try{
  const subscriptions=await subscriptionModel.find();
  res.json(subscriptions);
  }catch(error){
 console.log("subscriptions not found");
  }
};
export const deletingSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await subscriptionModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const remaining = await subscriptionModel.find(); // send updated list
    res.json(remaining);
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting subscription" });
  }
};
export const displaySubsOnHomePage=async (req,res)=>
{
try{
const subs=await subscriptionModel.find();
res.json(subs);
}catch(error){
console.log("No subscriptions found");
}
};


export const postLoginCredentials = async (req, res) => {
  try {
    const { username, password } = req.body;  
    // username is actually email

    // 1️⃣ HARD CODED ADMIN LOGIN
    if (username === "alishbazeshan78@gmail.com" && password === "admin") {
      const adminToken = jwt.sign(
        { role: "admin", email: username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      console.log("🔑 JWT TOKEN CREATED (ADMIN):");
      console.log("Token:", adminToken);
      console.log("Payload:", { role: "admin", email: username });
      console.log("---");

      return res.json({
        role: "admin",
        token: adminToken,
        message: "Admin login successful",
      });
    }

    // 2️⃣ FIND USER IN DATABASE BY EMAIL ONLY
    const user = await learnifyApplicationModel.findOne({ email: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 3️⃣ CHECK PASSWORD USING bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 4️⃣ CREATE LOGIN TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("🔑 JWT TOKEN CREATED (USER):");
    console.log("Token:", token);
    console.log("Payload:", { id: user._id, email: user.email, role: "user" });
    console.log("---");

    return res.json({
      role: "user",
      token,
      message: "User login successful",
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const postingContacts=async(req,res)=>{
  try{
     const newcontact=new ContactModel(req.body);
     const savedContact=await newcontact.save();
     res.json(savedContact);
  }catch (error){
  console.log("Not saved");
  }
}

export const gettingname= async (req,res)=>{

  try {
    // req.user is set by verifyToken middleware
    const userId = req.user.id;

    // Find user by ID in database
    const user = await learnifyApplicationModel.findById(userId).select("firstName");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user info to frontend
    res.json(user);

  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// File: ../controller/application.js



export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await learnifyApplicationModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// FIX: Use req.user.id instead of req.params.id
export const deleteUserByUser = async (req, res) => { // Added req, res
  try {
    const userId = req.user.id; // Get ID from JWT payload

    const deletedUser = await learnifyApplicationModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      // This should ideally not happen if token is valid, but good to check
      return res.status(404).json({ message: "User not found" }); 
    }

    // You might also want to clear the user's token or session here if using sessions
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// FIX: Use req.user.id instead of req.params.id
export const UpdateUserByUserData = async (req, res) => { // Added req, res
  try {
    const userId = req.user.id; // Get ID from JWT payload
    const updatedData = req.body;

    // Optional: Remove password from updatedData if present for security
    delete updatedData.password; 

    const result = await learnifyApplicationModel.findByIdAndUpdate(userId, updatedData, { new: true, runValidators: true }).select("-password");
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", result });
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ message: "Failed to edit user" });
  }
};