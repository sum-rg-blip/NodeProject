
// controllers/orderController.js
import Order from "../models/Order.js";

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user,
      products: req.body.products || [],
      totalAmount: req.body.totalAmount || 0,
      status: "Ordered",
    });

    const populated = await Order.findById(order._id).populate("user", "name email");
    return res.status(201).json(populated);
  } catch (err) {
    return res.status(500).json({ message: "Order failed", error: err?.message });
  }
};

// ✅ Get Orders (for current user)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders", error: err?.message });
  }
};

// ✅ Get Order By ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // optional: restrict owner
    if (String(order.user?._id || order.user) !== String(req.user)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    return res.json(order);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch order", error: err?.message });
  }
};

// ✅ Return Order
export const returnOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // optional: restrict owner
    if (String(order.user) !== String(req.user)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = "Returned";
    order.returnReason = req.body?.reason || "";
    await order.save();

    const populated = await Order.findById(order._id).populate("user", "name email");
    return res.json(populated);
  } catch (err) {
    return res.status(500).json({ message: "Return failed", error: err?.message });
  }
};

// ✅ Confirm Order (ONLY ONCE)
export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // optional: restrict owner
    if (String(order.user?._id || order.user) !== String(req.user)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 🚫 block repeat confirm
    if (order.status === "Confirmed") {
      return res.status(409).json({ message: "Order already confirmed" });
    }

    order.status = "Confirmed";
    order.confirmedAt = new Date();
    await order.save();

    const updated = await Order.findById(order._id).populate("user", "name email");
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Confirm failed", error: err?.message });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // optional: only owner can delete
    if (String(order.user) !== String(req.user)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Order.deleteOne({ _id: order._id });
    return res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Delete failed", error: err?.message });
  }
};

