import Message from "../models/Message.js";

// @desc    Receive contact message
// @route   POST /api/contact
// @access  Public
export const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error, please try again later." });
    }
};
