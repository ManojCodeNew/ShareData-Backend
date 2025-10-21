import mongoose from "mongoose";
import Dotenv from 'dotenv'

// .env config
Dotenv.config();

export default async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}