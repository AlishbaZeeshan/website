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
import webhookRouter from "./routes/webhookroutes.js";
import paymentRouter from "./routes/paymentroutes.js";
import profile from "./routes/profileroutes.js";

import serverless from "serverless-http";

dotenv.config();

const app = express();

// Static folder
app.use("/uploads", express.static("uploads"));

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Stripe webhook (raw body)
app.use(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);

// Body parser (after webhook)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
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

// IMAGE ROUTE
app.get("/component-image/:key", async (req, res) => {
  try {
    const key = req.params.key;
    const image = await imageModel.findOne({ componentKey: key });

    if (!image) {
      return res.status(404).json({
        status: "not found",
        message: `No image found for componentKey: ${key}`,
      });
    }

    res.json({ status: "ok", data: image });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// LOCAL SERVER (ignored on Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// FOR VERCEL SERVERLESS
export const handler = serverless(app);
export default app;
