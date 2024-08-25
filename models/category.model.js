import mongoose, {Schema}from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    lowercase:true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

export const Category=mongoose.model("Category",categorySchema );