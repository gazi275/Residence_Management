import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import NodeCache from "node-cache";
import router from "./app/route/route";
import GlobalErrorHandler from "./app/middleware/globalErrorHandler";
import { MongoClient } from "mongodb";
import { StatusCodes } from "http-status-codes";
import { PrismaConnection } from "./app/DB/PrismaConnection";
import path from "path";
import fs from "fs";
import morgan from "morgan";
import { title } from "process";
import { swaggerSpec, swaggerUiOptions } from "./config/swaggerConfig";

export const myCache = new NodeCache({ stdTTL: 300 });
const app = express();

export const corsOptions = {
  origin: ["*"], 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(morgan("dev")); // 'dev' is a predefined format
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    success: true,
    title: `${process.env.CLIENT_NAME} API`,
    message: "Hello World!",
  });
});

const uploadPath = path.join(__dirname, "..", "uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created successfully!");
}

app.use("/uploads", express.static(uploadPath));

const connectDB = async () => {
  try {
    const conn = await new MongoClient(
      process.env.DATABASE_URL as string
    ).connect();
    console.log(`MongoDB Connected Successfully`);
  } catch (error: any) {
    console.error(`Error: ${error?.message}`);
  // Do not use process.exit(1) in production. Log error only.
  }
};

connectDB();

app.use("/api/v1", router);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);
app.use(GlobalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
