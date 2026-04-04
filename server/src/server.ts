import dotenv from "dotenv"
import app from "./app"
import mongoose from "mongoose"

dotenv.config()

const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI as string

/* =====================
   Connect Database
===================== */

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    console.log("MongoDB Connected Successfully")
  } catch (error) {
    console.error("MongoDB Connection Error:", error)
    process.exit(1)
  }
}

/* =====================
   Start Server
===================== */

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
