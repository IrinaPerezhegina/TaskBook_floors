import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/tasks.js";
import userRoutes from "./src/routes/users.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
