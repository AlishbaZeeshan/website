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

dotenv.config();


const app = express();

app.use('/uploads', express.static('uploads'));
// CORS setup - Allow both local and production origins
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://your-frontend-domain.vercel.app"],
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Stripe webhook must come BEFORE bodyParser.json
app.use('/stripe-webhook', express.raw({ type: 'application/json' }), webhookRouter);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/registrationPage', application);
app.use('/AdminDashboard', verifyToken, isAdmin, application);
app.use('/MaintainSubscription', verifyToken, isAdmin, subscription);
app.use('/', homepage);
app.use('/UsersView', verifyToken, isAdmin, application);
app.use('/login', login);
app.use('/contacts', verifyToken, contact);
app.use('/Dashboard', verifyToken, dashboard);
app.use('/create-checkout-session', verifyToken, paymentRouter);
app.use('/profile',verifyToken,profile);

//multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname)
  }
})



// Get image by componentKey
// Serve all component images dynamically
app.get("/component-image/:key", async (req, res) => {
  try {
    const key = req.params.key;

    // Look for the image in DB
    const image = await imageModel.findOne({ componentKey: key });

    if (!image) {
      return res.status(404).json({ 
        status: "not found", 
        message: `No image found for componentKey: ${key}` 
      });
    }

    // Return image info
    res.json({ 
      status: "ok", 
      data: { image: image.image, componentKey: image.componentKey } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error });
  }
});




// MongoDB connection
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.error(err));

// For local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
export default app;
