import { ConfidentialClientApplication, Configuration } from "@azure/msal-node";

/**
 * Creates an instance of the MSAL ConfidentialClientApplication.
 * This function initializes and returns an instance of the ConfidentialClientApplication
 * using the provided MSAL configuration.
 *
 * @param {Configuration} msalConfig - The MSAL configuration.
 * @returns {ConfidentialClientApplication} - An instance of the MSAL ConfidentialClientApplication.
 * @since 1.0
 * @author Marek Reid
 * @date 09/01/2023
 */
export const getMsalInstance = (
  msalConfig: Configuration
): ConfidentialClientApplication => {
  // Create and return an instance of the ConfidentialClientApplication.
  return new ConfidentialClientApplication(msalConfig);
};
