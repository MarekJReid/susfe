// Package imports
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";

// Module imports
import { configureSessionMiddleware } from "./config/sessionMiddlewareConfig";
import { sessionController } from "./controllers/sessionController";
import { checkAuthentication } from "./middleware/sessionMiddleware";
import authRouter from "./routes/auth";
import { handle404Errors } from "./utils/handle404Errors";

/**
 * @description This is the main entry point of the application.
 * It is responsible for setting up the Express server and
 * starting it on the specified port.
 * It also loads environment variables from the .env file and
 * configures the session middleware and
 * authentication routes.
 * @file app.ts
 * @param {string} port Port number
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

// Load environment variables from .env file
dotenv.config();

// Create Express server
const app = express();

// Enable CORS
app.use(cors());

// Initialize session middleware using the imported configuration
app.use(session(configureSessionMiddleware()));

// Parse request body and cookies
app.use(express.json());
app.use(cookieParser());

// Authentication routes
app.use("/auth", authRouter);

// Session data route protected by authentication
app.get("/session-data", checkAuthentication, sessionController);

// Handle 404 errors
app.use(handle404Errors);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
