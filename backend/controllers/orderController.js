import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
    });

    res.status(201).json(order);
  } catch {
    res.status(500).json({ message: "Order failed" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const returnOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Returned";
    order.returnReason = req.body.reason;
    await order.save();

    res.json(order);
  } catch {
    res.status(500).json({ message: "Return failed" });
  }
};
