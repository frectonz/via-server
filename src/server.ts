import hpp from "hpp";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";

import connectDB from "./config/db";

// Route files
import path from "./routes/path.route";
import session from "./routes/session.route";

import errorHandler from "./middleware/error";

const main = async () => {
  // Load env vars
  if (process.env.NODE_ENV === "development")
    dotenv.config({ path: "config.env" });

  const app = express();

  // Connect to database
  await connectDB();

  // Body parser
  app.use(express.json({ limit: "50mb" }));

  // Dev logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  // Set security headers
  app.use(helmet());
  // Prevent http param pollution
  app.use(hpp());
  // Enable CORS
  app.use(cors());

  app.get("/", (req, res) => {
    res.json("Hello");
  });

  // Mount routers
  app.use("/api/path", path);
  app.use("/api/session", session);

  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
};

main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, _) => {
  console.log(`Error: ${err.message}`);
});
