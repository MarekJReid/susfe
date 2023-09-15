/**
 * @description This file defines middleware for checking user authentication and extending the Express session.
 * @file sessionMiddleware.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Request, Response, NextFunction } from "express";
import { CustomSession } from "../models/customSession";

/**
 * Extends the default session interface with the CustomSession interface.
 * This allows adding additional properties to the session object for the MSAL config.
 */
declare module "express-session" {
  interface SessionData extends CustomSession {}
}

/**
 * Middleware for checking if a user is authenticated.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @function checkAuthentication
 * @since 1.0
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {void}
 */
export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get the custom session from the request
  const customSession = req.session as CustomSession;

  if (customSession) {
    // User is authenticated, continue with the request
    next();
  } else {
    // User is not authenticated, respond with an authentication error
    res.status(401).json({ error: "Authentication required." });
  }
};
