/**
 * @description This file defines a controller function for handling redirects after successful authentication.
 * @file handleRedirectController.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Request, Response, NextFunction } from "express";
import {
  AccountInfo,
  ConfidentialClientApplication,
  Configuration,
  AuthorizationCodeRequest,
  CryptoProvider,
} from "@azure/msal-node";
import { msalConfig } from "../config/authConfig";

/**
 * Represents custom session data properties.
 * @interface CustomSessionData
 * @property {string} tokenCache - Serialized token cache.
 * @property {string} idToken - The ID token.
 * @property {AccountInfo} account - Account information.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 */
interface CustomSessionData {
  tokenCache?: string;
  idToken?: string;
  account?: AccountInfo;
  isAuthenticated?: boolean;
}

/**
 * Represents options for the handleRedirectController middleware.
 * @interface Options
 * @property {string[]} scopes - Scopes to request during token acquisition.
 */
interface Options {
  scopes?: string[];
}

/**
 * Middleware for handling redirects after successful authentication.
 * @param {Function} getMsalInstance - Function to get the MSAL instance.
 * @param {Options} options - Options for the handleRedirectController middleware.
 * @returns {Promise<void>} - A promise that resolves when the redirect handling is complete.
 * @function handleRedirectController
 * @since 1.0
 * @param {Function} getMsalInstance - Function to get the MSAL instance.
 * @param {Options} options - Options for the handleRedirectController middleware.
 * @returns {Promise<void>} - A promise that resolves when the redirect handling is complete.
 */

export const handleRedirectController = (
  getMsalInstance: (msalConfig: Configuration) => ConfidentialClientApplication,
  options: Options
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Check if response state is available
    if (!req.body || !req.body.state) {
      return next(new Error("Error: response not found"));
    }

    // Create a CryptoProvider instance
    const cryptoProvider = new CryptoProvider();

    // Get custom session data from the request
    const session = req.session as unknown as CustomSessionData;

    // Extract authorization code from query parameters
    const authorizationCode = req.query.code;

    // Check if authorization code is available
    if (!authorizationCode) {
      return next(new Error("Error: authorization code not found"));
    }

    // Check if authorization code is a string
    if (typeof authorizationCode !== "string") {
      return next(new Error("Error: Code is not a string"));
    }

    try {
      // Get the MSAL instance using the provided function and config
      const msalInstance = getMsalInstance(msalConfig);

      // Deserialize token cache if available in session
      if (session.tokenCache) {
        msalInstance.getTokenCache().deserialize(session.tokenCache);
      }

      // Create an AuthorizationCodeRequest object
      const authorizationCodeRequest: AuthorizationCodeRequest = {
        redirectUri: "...", // Use the correct redirect URI
        code: authorizationCode,
        scopes: options.scopes || [],
      };

      // Acquire a token using the authorization code
      const tokenResponse = await msalInstance.acquireTokenByCode(
        authorizationCodeRequest
      );

      // Update session data with token information
      session.tokenCache = msalInstance.getTokenCache().serialize();
      session.idToken = tokenResponse.idToken;
      session.account = tokenResponse.account || undefined;
      session.isAuthenticated = true;

      // Parse the state and redirect to the success URL
      const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));
      res.redirect("http://localhost:3002/dashboard");
    } catch (error) {
      // Handle errors using the Express next function
      next(error);
    }
  };
};
