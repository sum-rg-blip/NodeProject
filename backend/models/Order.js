import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      default: "Ordered",
    },
    returnReason: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
