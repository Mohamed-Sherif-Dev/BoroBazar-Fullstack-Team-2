import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import orderRoutes from "./routes/order.routes";
import adminRoutes from "./routes/admin.routes";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

/* =====================
   Middlewares
===================== */

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =====================
   Health Check Route
===================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/* =====================
   Routes
===================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

/* =====================
   Export App
===================== */

export default app;
