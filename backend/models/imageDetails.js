import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  image: String,        // filename stored in backend/uploads/
  componentKey: String, // unique key for each component
});

export default mongoose.model("imageDetails", imageSchema);
