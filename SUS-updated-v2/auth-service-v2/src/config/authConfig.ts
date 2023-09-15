/**
 * @description This file defines the configuration and constants for MSAL authentication and related endpoints.
 * @file authConfig.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Configuration, LogLevel } from "@azure/msal-node";
import dotenv from "dotenv";

// Load environment variables from .env.dev file
dotenv.config({ path: ".env.dev" });

/**
 * MSAL configuration options for authentication.
 * @const msalConfig
 * @since 1.0
 * @type {Configuration}
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID || "", // Use a default empty string or your desired fallback value
    authority:
      (process.env.CLOUD_INSTANCE || "") + (process.env.TENANT_ID || ""),
    clientSecret: process.env.CLIENT_SECRET || "",
  },
  system: {
    loggerOptions: {
      loggerCallback: (_logLevel, message) => {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: LogLevel.Info,
    },
  },
};

/**
 * The redirect URI for authentication.
 * @const REDIRECT_URI
 * @since 1.0
 * @type {string}
 */
export const REDIRECT_URI: string = process.env.REDIRECT_URI || "";

/**
 * The post-logout redirect URI.
 * @const POST_LOGOUT_REDIRECT_URI
 * @since 1.0
 * @type {string}
 */
export const POST_LOGOUT_REDIRECT_URI: string =
  process.env.POST_LOGOUT_REDIRECT_URI || "";

/**
 * The Graph API endpoint for retrieving user profile data.
 * @const GRAPH_ME_ENDPOINT
 * @since 1.0
 * @type {string}
 */
export const GRAPH_ME_ENDPOINT: string =
  (process.env.GRAPH_API_ENDPOINT || "") + "v1.0/me";
