import axios from "axios";

/**
 * Retrieves the OpenID configuration metadata for the specified authority.
 * @param {string | undefined} authority - The authority URL.
 * @returns {Promise<any>} - A promise that resolves to the OpenID configuration metadata.
 * @since 1.0
 * @author Marek Reid
 * @date 09/01/2023
 */
export const getAuthorityMetadata = async (
  authority: string | undefined
): Promise<unknown> => {
  // Construct the endpoint URL for the OpenID configuration metadata.
  const endpoint = `${authority}/v2.0/.well-known/openid-configuration`;

  try {
    // Send a GET request to the endpoint to retrieve the metadata.
    const response = await axios.get(endpoint);
    // Return the retrieved OpenID configuration metadata.
    return response.data;
  } catch (error) {
    // Handle errors by logging them to the console.
    console.log(error);
  }
};
