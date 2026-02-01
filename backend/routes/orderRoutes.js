import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getOrderById,
  returnOrder,
  confirmOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.patch("/:id/confirm", authMiddleware, confirmOrder);
router.post("/:id/return", authMiddleware, returnOrder);
router.delete("/:id", authMiddleware, deleteOrder);


export default router;
