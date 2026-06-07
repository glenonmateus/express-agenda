import mongoose from "mongoose";

const HomeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);

export { HomeModel };
