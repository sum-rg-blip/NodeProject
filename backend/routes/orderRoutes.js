import express from "express";
import {
  createOrder,
  getOrders,
  returnOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.post("/:id/return", authMiddleware, returnOrder);

export default router;
