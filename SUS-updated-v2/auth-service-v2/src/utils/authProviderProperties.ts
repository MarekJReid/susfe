/**
 * @description This file defines the interface and utility function for authentication provider properties.
 * These properties include the MSAL configuration and a crypto provider.
 * @file authProviderProperties.ts
 * @version 1.0
 * @date 01/08/2023
 * @author Marek Reid
 */

import { Configuration, CryptoProvider } from "@azure/msal-node";

/**
 * Represents the properties required for configuring an authentication provider.
 */
export interface AuthProviderProperties {
  msalConfig: Configuration; // The MSAL configuration for authentication.
  cryptoProvider: CryptoProvider; // The crypto provider for handling cryptographic operations.
}

/**
 * Creates authentication provider properties using the provided MSAL configuration.
 * @param {Configuration} msalConfig - The MSAL configuration for authentication.
 * @returns {AuthProviderProperties} - Authentication provider properties.
 */
export const createAuthProviderProperties = (
  msalConfig: Configuration
): AuthProviderProperties => {
  return {
    msalConfig,
    cryptoProvider: new CryptoProvider(),
  };
};
