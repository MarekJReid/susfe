/**
 * @description This file defines the Express router configuration for authentication-related routes.
 * @file authRoutes.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import express, { Router } from "express";
import { REDIRECT_URI } from "../config/authConfig";
import { acquireToken } from "../controllers/aquireTokenController";
import { handleRedirectController } from "../controllers/hanldeRedirect";
import { login } from "../controllers/loginController";
import { getMsalInstance } from "../utils/getMsalInstance";

// Create an Express router instance
const router: Router = express.Router();

/**
 * Handles the "/signin" route for user login.
 * @method GET
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next function.
 */
router.get(
  "/signin",
  login({
    scopes: [],
    redirectUri: REDIRECT_URI,
    successRedirect: "/",
  })
);

/**
 * Handles the "/acquireToken" route for acquiring tokens.
 * @method GET
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next function.
 */
router.get(
  "/acquireToken",
  acquireToken(getMsalInstance, {
    scopes: ["User.Read"],
    redirectUri: REDIRECT_URI,
    successRedirect: "/users/profile",
  })
);

/**
 * Handles the "/redirect" route for handling redirects.
 * @method POST
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next function.
 */
router.post(
  "/redirect",
  handleRedirectController(getMsalInstance, {
    scopes: ["User.Read"],
  })
);

// Commented out route (example) TODO!
// router.get(
//   "/signout",
//   authProvider.logout({
//     postLogoutRedirectUri: POST_LOGOUT_REDIRECT_URI,
//   })
// );

export default router;
