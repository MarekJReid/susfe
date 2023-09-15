/**
 * @description This file defines a controller function for handling session data.
 * @file sessionController.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Request, Response } from "express";
import { CustomSession } from "../utils/redirectToAuthCodeUrl";

/**
 * Handles the "/session-data" route and sends session data if available.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @function sessionController
 * @since 1.0
 * @returns {void}
 */
export const sessionController = (req: Request, res: Response): void => {
  // Get the custom session from the request
  const customSession = req.session as CustomSession;

  if (customSession && customSession.pkceCodes) {
    // Send session data if available
    res.json({
      pkceCodes: customSession.pkceCodes,
      authCodeUrlRequest: customSession.authCodeUrlRequest,
      authCodeRequest: customSession.authCodeRequest,
    });
  } else {
    // Respond with an error if no session data is available
    res.status(400).json({ error: "No session data available." });
  }
};

export default sessionController;
