import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import imageModel from "./models/imageDetails.js";

import application from "./routes/application.js";
import subscription from "./routes/subscriptionRoutes.js";
import homepage from "./routes/homepageroutes.js";
import login from "./routes/loginroutes.js";
import contact from "./routes/contactroutes.js";
import dashboard from "./routes/dashboardroutes.js";
import verifyToken from "./middlewares/verifyToken.js";
import isAdmin from "./middlewares/isAdmin.js";
import webhookRouter from './routes/webhookroutes.js';
import paymentRouter from './routes/paymentroutes.js';
import profile from "./routes/profileroutes.js";

import serverless from "serverless-http";

dotenv.config();

// -------------------------
// EXPRESS APP
// -------------------------
const app = express();

app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://your-frontend-domain.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Stripe webhook (raw body)
app.use('/stripe-webhook', express.raw({ type: 'application/json' }), webhookRouter);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------------
// ROUTES
// -------------------------
app.use("/", homepage);
app.use("/registrationPage", application);
app.use("/AdminDashboard", verifyToken, isAdmin, application);
app.use("/MaintainSubscription", verifyToken, isAdmin, subscription);
app.use("/UsersView", verifyToken, isAdmin, application);
app.use("/login", login);
app.use("/contacts", verifyToken, contact);
app.use("/Dashboard", verifyToken, dashboard);
app.use("/create-checkout-session", verifyToken, paymentRouter);
app.use("/profile", verifyToken, profile);

// Image fetch route
app.get("/component-image/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const image = await imageModel.findOne({ componentKey: key });

    if (!image) {
      return res.status(404).json({ status: "not found", message: `No image found for ${key}` });
    }

    res.json({ status: "ok", data: image });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

// -------------------------
// DATABASE CONNECTION
// -------------------------
const url = process.env.MONGODB_URI;

if (!url) {
  console.error("❌ MONGODB_URI is missing");
}

mongoose
  .connect(url)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// -------------------------
// EXPORT AS SERVERLESS HANDLER (VERY IMPORTANT)
// -------------------------
export const config = {
  api: {
    bodyParser: false, // Required for Stripe webhook
  },
};

export default serverless(app);
