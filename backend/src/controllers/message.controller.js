import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessages = async (req, res) => {
    try {
        const { content } = req.body;
        const { id: receiverId } = req.params;
    const senderId = req.user._id;
        
        // Validate content exists
        if (!content) {
            return res.status(400).json({ 
                message: "Content is required",
                receivedBody: req.body
            });
        }

        // Process image if present
        let imageUrl = "";
        if (content.image) {
            // Add image format validation here
            if (!content.image.match(/^data:image\/(png|jpeg|jpg|gif);base64,/)) {
                return res.status(400).json({ 
                    message: "Invalid image format",
                    supported_formats: ["png", "jpeg", "jpg", "gif"]
                });
            }

            try {
                console.log("Attempting Cloudinary upload...");
                const uploadResponse = await cloudinary.uploader.upload(content.image, {
                    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
                    resource_type: 'auto',
                    chunk_size: 6000000
                });
                imageUrl = uploadResponse.secure_url;
                console.log("Upload successful:", imageUrl);
            } catch (uploadError) {
                console.error("Cloudinary upload error:", {
                    message: uploadError.message,
                    http_code: uploadError.http_code,
                    name: uploadError.name
                });
                return res.status(400).json({ 
                    message: "Image upload failed",
                    error: uploadError.message,
                    details: uploadError.http_code ? `Cloudinary error ${uploadError.http_code}` : undefined
                });
            }
        }

        // Create and save message
        const newMessage = new Message({
            senderId: req.user._id,
            receiverId: req.params.id,
            content: {
                text: content.text?.trim() || "",
                image: imageUrl
            }
        });

        const savedMessage = await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
        return res.status(201).json(savedMessage);

    } catch (error) {
        console.error("Message submission error:", {
            error: error.message,
            stack: error.stack,
            fullError: error
        });
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
};