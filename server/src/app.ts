import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
// import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
const app = express()

/* =====================
   Middlewares
===================== */

app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true
  }
))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

/* =====================
   Health Check Route
===================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running"
  })
})

/* =====================
   Routes
===================== */


app.use("/api/categories", categoryRoutes);
app.use("/api", productRoutes);

// example
// import authRoutes from "./routes/auth.routes"
// app.use("/api/auth", authRoutes)

/* =====================
   Export App
===================== */

export default app