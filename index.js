import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import Message from './models/Message.js';
import connect from './config/dbconnect.js';

// Dot env config
dotenv.config()

// Request handler setup
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Database connection
connect();

// Multer setup to handle files (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Token generator
const genrateToken = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

// Post route
app.post('/api/message', upload.single('file'), async (req, res) => {
    try {
        const { message } = req.body;
        if (!message && !req.file) {
            return res.status(400).json({ message: "Message or file is required" });
        }

        let fileBase64 = null;
        // If req.file exists, convert it to base64
        if (req.file) {
            fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        }

        const newMessage = new Message({
            message,
            token: genrateToken(),
            fileBase64
        });
        await newMessage.save();
        res.json({ message: "Message saved successfully", token: newMessage.token });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get route
app.get('/api/message/:token', async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            res.status(400).json({ message: "Error: Token is required" });
        }

        const message = await Message.findOne({ token });

        if (!message) {
            return res.status(404).json({ message: "Error: Message not found" });
        }

        res.json({ message: message.message, fileBase64: message.fileBase64 });
    } catch (error) {
        console.error("Error fetching message:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port ${PORT}`);
});