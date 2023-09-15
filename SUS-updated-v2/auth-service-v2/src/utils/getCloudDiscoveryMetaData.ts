import axios from "axios";

/**
 * Retrieves cloud discovery metadata for the specified authority.
 * This function queries the cloud instance discovery endpoint to retrieve
 * information about the authorization endpoint and other details.
 *
 * @param {string | undefined} authority - The authority URL.
 * @returns {Promise<any>} - A promise that resolves to the cloud discovery metadata.
 * @since 1.0
 * @author Marek Reid
 * @date 09/01/2023
 */
export const getCloudDiscoveryMetadata = async (
  authority: string | undefined
): Promise<unknown> => {
  // Construct the cloud instance discovery endpoint URL.
  const endpoint =
    "https://login.microsoftonline.com/common/discovery/instance";

  try {
    // Send a GET request to the endpoint with query parameters.
    const response = await axios.get(endpoint, {
      params: {
        "api-version": "1.1",
        authorization_endpoint: `${authority}/oauth2/v2.0/authorize`,
      },
    });

    // Return the retrieved cloud discovery metadata.
    return response.data;
  } catch (error) {
    // Handle errors by logging them to the console.
    console.log(error);
  }
};
