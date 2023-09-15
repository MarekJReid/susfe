/**
 * @description This file defines the custom session interface extension for authentication-related data.
 * @file customSession.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Session } from "express-session";

/**
 * Represents a custom session extension with additional properties for authentication.
 * @interface CustomSession
 * @extends Session
 * @property {string | undefined} userId - The user ID associated with the session.
 * @property {Object} pkceCodes - PKCE (Proof Key for Code Exchange) codes.
 * @property {string} pkceCodes.challengeMethod - The PKCE challenge method.
 * @property {string} pkceCodes.verifier - The PKCE verifier.
 * @property {string} pkceCodes.challenge - The PKCE challenge.
 * @property {Object} authCodeUrlRequest - Parameters for authorization code URL request.
 * @property {string} authCodeUrlRequest.responseMode - The response mode.
 * @property {string} authCodeUrlRequest.codeChallenge - The code challenge.
 * @property {string} authCodeUrlRequest.codeChallengeMethod - The code challenge method.
 * @property {Object} authCodeRequest - Parameters for authorization code request.
 * @property {string} authCodeRequest.code - The authorization code.
 */
interface CustomSession extends Session {
  userId?: string | undefined;
  pkceCodes: {
    challengeMethod: string;
    verifier: string;
    challenge: string;
  };
  authCodeUrlRequest: {
    responseMode: string;
    codeChallenge: string;
    codeChallengeMethod: string;
  };
  authCodeRequest: {
    code: string;
  };
}

export { CustomSession };
