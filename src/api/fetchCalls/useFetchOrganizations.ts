import { useEffect, useState } from "react";
import { fetchFromAPI } from "../api";
import { Organization } from "../../types/device-types";

const useFetchOrganizations = (shouldFetchImmediately = true) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const data = await fetchFromAPI("/all-organizations");

      const organizedData = data.reduce(
        (
          acc: Organization[],
          item: { id: string; displayName: string; parent?: string }
        ) => {
          if (!item.parent) {
            acc.push({
              ...item,
              children: [],
            });
          } else {
            const parent = acc.find((org) => org.id === item.parent);
            if (parent) {
              if (!parent.children) {
                parent.children = []; // Initialize children if it's undefined
              }
              parent.children.push(item);
            }
          }
          return acc;
        },
        []
      );

      setOrganizations(organizedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetchImmediately) {
      fetchOrganizations();
    }
  }, [shouldFetchImmediately]);

  return { organizations, loading, error, refetch: fetchOrganizations };
};

export default useFetchOrganizations;
