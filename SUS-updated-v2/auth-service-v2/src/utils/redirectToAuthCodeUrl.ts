/**
 * @description This file defines utilities for generating and handling authorization code URLs with PKCE.
 * @file authCodeUtils.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { AuthorizationUrlRequest, ResponseMode } from "@azure/msal-node";
import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { properties } from "../controllers/loginController";

/**
 * Represents a session with custom properties for PKCE codes and authorization requests.
 */
interface CustomSession extends Session {
  pkceCodes: {
    challengeMethod: string;
    verifier: string;
    challenge: string;
  };
  authCodeUrlRequest: AuthorizationUrlRequest;
  authCodeRequest: unknown; // Update the type here as needed
}

export { CustomSession };

/**
 * Represents parameters for creating an authorization code URL request.
 */
interface AuthCodeUrlRequestParams {
  state: string;
  scopes: string[];
  redirectUri: string;
}

/**
 * Represents parameters for creating an authorization code request.
 */
interface AuthCodeRequestParams {
  state: string;
  scopes: string[];
  redirectUri: string | undefined;
}

/**
 * Redirects to an authorization code URL using PKCE.
 * @param {AuthCodeUrlRequestParams} authCodeUrlRequestParams - Parameters for creating an authorization code URL request.
 * @param {AuthCodeRequestParams} authCodeRequestParams - Parameters for creating an authorization code request.
 * @returns {Promise<void>} - A promise that resolves when the redirection is complete.
 * @function redirectToAuthCodeUrl
 * @since 1.0
 * @param {AuthCodeUrlRequestParams} authCodeUrlRequestParams - Parameters for creating an authorization code URL request.
 * @param {AuthCodeRequestParams} authCodeRequestParams - Parameters for creating an authorization code request.
 * @returns {Promise<void>} - A promise that resolves when the redirection is complete.
 */
export const redirectToAuthCodeUrl = (
  authCodeUrlRequestParams: AuthCodeUrlRequestParams,
  authCodeRequestParams: AuthCodeRequestParams
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Generate PKCE codes (verifier and challenge)
    const { verifier, challenge } =
      await properties.cryptoProvider.generatePkceCodes();

    // Get the session from the current request
    const customSession = req.session as CustomSession;

    // Store PKCE codes in the session
    customSession.pkceCodes = {
      challengeMethod: "S256",
      verifier: verifier,
      challenge: challenge,
    };

    // Create the auth code URL request with PKCE parameters
    customSession.authCodeUrlRequest = {
      ...authCodeUrlRequestParams,
      responseMode: ResponseMode.FORM_POST,
      codeChallenge: customSession.pkceCodes.challenge,
      codeChallengeMethod: customSession.pkceCodes.challengeMethod,
    };

    // Create the auth code request with initial parameters
    customSession.authCodeRequest = {
      ...authCodeRequestParams,
      code: "",
    };

    // Log the session ID
    console.log("customSession", req.sessionID);

    try {
      // Redirect to the auth code URL (with workaround for known MSAL issue)
      res.redirect(customSession.authCodeUrlRequest.redirectUri);
    } catch (error) {
      // Handle errors using the Express next function
      next(error);
    }
  };
};
