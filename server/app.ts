import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import path from "path";
import fileRoutes from "./routes/file.routes";
import publicRoutes from "./routes/public.routes";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
app.use("/api/files", fileRoutes);
app.use("/api", publicRoutes);
export default app;