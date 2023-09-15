/**
 * @description This file defines a controller function for acquiring tokens silently.
 * @file acquireTokenController.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Request, Response, NextFunction } from "express";
import {
  AccountInfo,
  ConfidentialClientApplication,
  Configuration,
  InteractionRequiredAuthError,
} from "@azure/msal-node";
import { msalConfig } from "../config/authConfig";
import { login, properties } from "./loginController";

/**
 * Represents custom session data properties.
 * @interface CustomSessionData
 * @property {string} tokenCache - Serialized token cache.
 * @property {string} accessToken - The access token.
 * @property {string} idToken - The ID token.
 * @property {AccountInfo} account - Account information.
 */
interface CustomSessionData {
  tokenCache?: string;
  accessToken?: string;
  idToken?: string;
  account?: AccountInfo | undefined;
}

/**
 * Represents options for the acquireToken controller.
 * @interface Options
 * @property {string[]} scopes - Scopes to request during token acquisition.
 * @property {string} redirectUri - The redirect URI for token acquisition.
 * @property {string} successRedirect - The URL to redirect after successful token acquisition.
 */
interface Options {
  scopes?: string[];
  redirectUri?: string;
  successRedirect?: string;
}

/**
 * Middleware for acquiring tokens silently.
 * @param {Function} getMsalInstance - Function to get the MSAL instance.
 * @param {Options} options - Options for the acquireToken middleware.
 * @returns {Promise<void>} - A promise that resolves when token acquisition is complete.
 * @function acquireToken
 * @since 1.0
 * @param {Function} getMsalInstance - Function to get the MSAL instance.
 * @param {Options} options - Options for the acquireToken middleware.
 * @returns {Promise<void>} - A promise that resolves when token acquisition is complete.
 */
export const acquireToken = (
  getMsalInstance: (msalConfig: Configuration) => ConfidentialClientApplication,
  options: Options
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Get custom session data from the request
    const session = req.session as CustomSessionData;

    try {
      // Get the MSAL instance using the provided function and config
      const msalInstance = getMsalInstance(msalConfig);

      // Deserialize token cache and check if account is available
      if (session.tokenCache && session.account) {
        msalInstance.getTokenCache().deserialize(session.tokenCache);
      }

      // Check if account is available, otherwise redirect to login
      if (!session.account) {
        // Redirect to login page or handle the error as needed
        return res.redirect("/login");
      }

      // Acquire token silently
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account: session.account,
        scopes: options.scopes || [],
      });

      // Update session data with token information
      session.tokenCache = msalInstance.getTokenCache().serialize();
      session.accessToken = tokenResponse.accessToken;
      session.idToken = tokenResponse.idToken;
      session.account = tokenResponse.account || undefined;

      // Redirect to success URL or default
      res.redirect(options.successRedirect ?? "/");
    } catch (error) {
      // Handle InteractionRequiredAuthError with login
      if (error instanceof InteractionRequiredAuthError) {
        // Use the imported login function here with appropriate parameters
        return login({
          msalConfig, // Pass the appropriate configuration
          cryptoProvider: properties.cryptoProvider, // Pass the appropriate cryptoProvider instance
        })(req, res, next);
      }
      // Handle other errors using the Express next function
      next(error);
    }
  };
};
