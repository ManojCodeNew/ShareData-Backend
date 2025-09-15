import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    token: {
        type: Number,
        required: true
    }
}, { timestamps: true });
export default mongoose.model("Message", messageSchema);