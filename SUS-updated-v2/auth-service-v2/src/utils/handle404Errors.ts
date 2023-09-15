/**
 * @description This file defines utility functions for handling errors and generating HTTP error responses.
 * @file errorHandlers.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

/**
 * Handles 404 Not Found errors by generating an HTTP 404 response.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @function handle404Errors
 * @since 1.0
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {void}
 */
export function handle404Errors(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Generate a 404 error using the http-errors package
  next(createError(404));
}
