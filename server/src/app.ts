import express from "express";
import cors from "cors";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/admin", adminRoutes);

export default app;
