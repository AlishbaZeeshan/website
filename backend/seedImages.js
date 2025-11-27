import mongoose from "mongoose";
import dotenv from "dotenv";
import imageModel from "./models/imageDetails.js";

dotenv.config();

const images = [
  { image: "ai.jpg", componentKey: "info_section_image" },
  { image: "audio.jpg", componentKey: "home_audiocard_image" },
  { image: "contact.jpg", componentKey: "contact" },
  { image: "fb.jpg", componentKey: "fb" },
  { image: "note.jpg", componentKey: "note" },
  { image: "insta.jpg", componentKey: "insta" },
  { image: "logo3.png", componentKey: "logo" },
  { image: "pic1.jpg", componentKey: "mainpic" },
  { image: "quiz2.jpg", componentKey: "quiz" },
  { image: "reg2.jpg", componentKey: "regpage" },
  { image: "twitter.jpg", componentKey: "twitter" },
  { image: "video.jpg", componentKey: "video" },
              
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Database connected");

    // Clear old images
    await imageModel.deleteMany({});

    // Insert new images
    await imageModel.insertMany(images);
    console.log("Seed images inserted");

    process.exit();
  })
  .catch(err => console.log(err));
