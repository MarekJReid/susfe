import { useEffect, useMemo, useState } from "react";

import { Organization } from "../../../types/device-types";
import { fetchFromAPI } from "../../api";
import { createOrganizationHierarchy } from "./utils";

const useFetchOrganizations = (shouldFetchImmediately = true) => {
  const [loadingOrganizations, setLoading] = useState(false);
  const [errorOrganizations, setError] = useState<string | unknown>(null);
  const [organizationsToSend, setOrganizationsToSend] = useState<
    Organization[]
  >([]);

  // Function to fetch organizations from the API and organize them hierarchically
  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      // Fetch data from the API endpoint
      const data = await fetchFromAPI("/all-organizations");

      // Organize the fetched data into a hierarchical structure
      const organizedData = createOrganizationHierarchy(data);
      console.log(
        organizedData[0],
        organizedData[1],
        organizedData[2],
        organizedData[3]
      );
      setOrganizationsToSend(organizedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  // Fetch organizations immediately if shouldFetchImmediately is true
  useEffect(() => {
    if (shouldFetchImmediately) {
      fetchOrganizations();
    }
  }, [shouldFetchImmediately]);

  // Memoize the organizations using useMemo
  const organizations = useMemo(() => {
    return organizationsToSend;
  }, [organizationsToSend]);

  return {
    organizations, // Return the memoized organizations
    loadingOrganizations,
    errorOrganizations,
    refetchOrganizations: fetchOrganizations, // Function to manually trigger a re-fetch
  };
};

export default useFetchOrganizations;
