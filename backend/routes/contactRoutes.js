import express from "express";
import { sendMessage, getMessages, getMessageById } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendMessage);


router.get("/messages", getMessages);
router.get("/messages/:id", getMessageById);

export default router;
