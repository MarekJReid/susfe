/**
 * @description This file defines the login middleware for handling authentication and login redirects.
 * @file loginMiddleware.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { CryptoProvider } from "@azure/msal-node";
import { NextFunction, Request, Response } from "express";
import { AuthProviderProperties } from "../utils/authProviderProperties";
import { getAuthorityMetadata } from "../utils/getAuthorityMedaData";
import { getCloudDiscoveryMetadata } from "../utils/getCloudDiscoveryMetaData";

import { redirectToAuthCodeUrl } from "../utils/redirectToAuthCodeUrl";
import { msalConfig } from "../config/authConfig";

/**
 * Represents options for the login middleware.
 * @interface AuthOptions
 * @property {string} successRedirect - The URL to redirect after successful login.
 * @property {string[]} scopes - Scopes to request during authentication.
 * @property {string} redirectUri - The redirect URI for login.
 * @property {unknown} [key] - Additional arbitrary properties.
 */
interface AuthOptions {
  successRedirect?: string;
  scopes?: string[];
  redirectUri?: string;
  [key: string]: unknown;
}

/**
 * Represents properties for the authentication provider.
 */
export const properties: AuthProviderProperties = {
  msalConfig: msalConfig,
  cryptoProvider: new CryptoProvider(),
};

/**
 * Middleware for handling user login and authentication.
 * @param {AuthOptions} options - Options for the login middleware.
 * @returns {Promise<void>} - A promise that resolves when the authentication process is complete.
 * @function login
 * @since 1.0
 * @param {AuthOptions} options - Options for the login middleware.
 * @returns {Promise<void>} - A promise that resolves when the authentication process is complete.
 */
export const login = (
  options: AuthOptions = {}
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { msalConfig, cryptoProvider } = properties;
    try {
      // Your login implementation here, using authProvider instance

      // Encode state for redirect
      const state = cryptoProvider.base64Encode(
        JSON.stringify({
          successRedirect: options.successRedirect || "/",
        })
      );

      // Prepare parameters for auth code URL request and auth code request
      const authCodeUrlRequestParams = {
        state: state,
        scopes: options.scopes || [],
        redirectUri: options.redirectUri || "",
        promt: "login",
      };

      const authCodeRequestParams = {
        state: state,
        scopes: options.scopes || [],
        redirectUri: options.redirectUri,
        promt: "login",
      };

      // Check and fetch metadata if not available
      if (
        !msalConfig.auth.cloudDiscoveryMetadata ||
        !msalConfig.auth.authorityMetadata
      ) {
        const [cloudDiscoveryMetadata, authorityMetadata] = await Promise.all([
          getCloudDiscoveryMetadata(msalConfig.auth.authority),
          getAuthorityMetadata(msalConfig.auth.authority),
        ]);

        msalConfig.auth.cloudDiscoveryMetadata = JSON.stringify(
          cloudDiscoveryMetadata
        );
        msalConfig.auth.authorityMetadata = JSON.stringify(authorityMetadata);
      }

      // Perform redirect using redirectToAuthCodeUrl
      return redirectToAuthCodeUrl(
        authCodeUrlRequestParams,
        authCodeRequestParams
      )(req, res, next);
    } catch (error) {
      // Handle errors using the Express next function
      next(error);
    }
  };
};
