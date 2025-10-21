import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    token: {
        type: Number,
        required: true
    },
    fileBase64: {
        type: String,
        required: false
    }
    // Aws storing schema 
    // fileUrl: {
    //     type: String, // store uploaded file path or URL
    // }
}, { timestamps: true });
export default mongoose.model("Message", messageSchema);