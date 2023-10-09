import { useEffect, useState } from "react";

import { fetchFromAuthAPI } from "../authApi";

const useFetchUserData = (shouldFetchImmediately = true, sessionId: string) => {
  const [userData, setUserData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorUserData, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    // <-- Added the 'async' keyword here
    setLoading(true);
    try {
      const data = await fetchFromAuthAPI("/user-info", sessionId);
      console.log("data", data);
      setUserData(data);
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
      fetchUserData();
    }
  }, [shouldFetchImmediately]);

  return {
    userData,
    loading,
    errorUserData,
    refetchUserData: fetchUserData,
  };
};

export default useFetchUserData;
