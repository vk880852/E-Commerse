import mongoose from "mongoose";
import { DB_NAME } from "../constrain.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("MongoDB connected:", connection.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;
