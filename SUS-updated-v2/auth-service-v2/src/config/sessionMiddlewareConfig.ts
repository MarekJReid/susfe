/**
 * @description This file defines a utility function to configure the session middleware for Express.
 * @file sessionMiddlewareConfig.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { SessionOptions } from "express-session";

/**
 * Configures the session middleware options for Express.
 * @function configureSessionMiddleware
 * @since 1.0
 * @returns {SessionOptions} - The session middleware options.
 */
export const configureSessionMiddleware = (): SessionOptions => {
  return {
    secret: process.env.EXPRESS_SESSION_SECRET!,
    resave: true,
    saveUninitialized: true,

    cookie: {
      httpOnly: true,
      secure: false, // set this to true on production for https-only cookies
    },
  };
};
