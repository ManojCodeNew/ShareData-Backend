import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Message from './models/Message.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log(error);

    }
}

const genrateToken = () => {
    return Math.floor(1000 + Math.random() * 9000);
}
app.post('/api/message', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }
        const newMessage = new Message({ message, token: genrateToken() });
        await newMessage.save();
        res.json({ message: "Message saved successfully", token: newMessage.token });

    } catch (error) {
        console.error("Error saving message:", error); // 👈 log actual error
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
})

app.get('/api/message/:token', async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            res.status(400).json({ message: "Error: Token is required" });
        }
        const message = await Message.findOne({ token });
        if (!message) {
            return res.status(404).json({ message: "Error: Message not found" });
        }
        res.json({ message: message.message });
    } catch (error) {
        res.status(500).json({ message: "Error: Something went wrong" });
    }
})

app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running on port 5000");
});