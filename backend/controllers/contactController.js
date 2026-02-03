import Message from "../models/Message.js";

// POST /api/contact
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


export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .select("name email message createdAt");

    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
};


export const getMessageById = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id).select("name email message createdAt");
    if (!msg) return res.status(404).json({ success: false, message: "Message not found" });

    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
};
