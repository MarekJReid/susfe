import { useEffect, useState } from "react";

import { Device } from "../../types/device-types";
import { fetchFromAPI } from "../api";

const useFetchDevices = (shouldFetchImmediately = true) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loadingDevices, setLoading] = useState<boolean>(false);
  const [errorDevices, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const data = await fetchFromAPI("/all-devices");
      setDevices(data);
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
      fetchDevices();
    }
  }, [shouldFetchImmediately]);

  return {
    devices,
    loadingDevices,
    errorDevices,
    refetchDevices: fetchDevices,
  };
};

export default useFetchDevices;

// tests for api
// { fetchFromAPI } from './api';
// import fetch from 'node-fetch';

// jest.mock('node-fetch');

// describe('fetchFromAPI', () => {
//   const sampleJwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
//   const sampleEndpoint = '/devices';

//   beforeEach(() => {
//     process.env.API_SUS_BASE_URL = 'http://localhost';
//     process.env.API_SUS_PORT = '3333';
//     process.env.SAMPLE_JWT_TOKEN = sampleJwtToken;
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should call fetch with the correct URL and headers', async () => {
//     const expectedUrl = 'http://localhost:3333/devices';
//     const expectedHeaders = {
//       Authorization: `Bearer ${sampleJwtToken}`,
//     };

//     await fetchFromAPI(sampleEndpoint);

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, { headers: expectedHeaders });
//   });

//   it('should return the response from the API', async () => {
//     const sampleResponse = { data: 'sample data' };
//     const mockFetch = jest.spyOn(fetch, 'default').mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce(sampleResponse),
//     } as any);

//     const result = await fetchFromAPI(sampleEndpoint);

//     expect(mockFetch).toHaveBeenCalled();
//     expect(result).toEqual(sampleResponse);
//   });

//   it('should throw an error if fetch fails', async () => {
//     const mockFetch = jest.spyOn(fetch, 'default').mockRejectedValueOnce(new Error('Fetch error'));

//     await expect(fetchFromAPI(sampleEndpoint)).rejects.toThrow('Fetch error');
//     expect(mockFetch).toHaveBeenCalled();
//   });

//   it('should construct the correct URL when environment variables are set', async () => {
//     process.env.API_SUS_BASE_URL = 'http://example.com';
//     process.env.API_SUS_PORT = '9000';
//     const expectedUrl = 'http://example.com:9000/devices';

//     await fetchFromAPI(sampleEndpoint);

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });

//   it('should construct the correct URL when environment variables are not set', async () => {
//     delete process.env.API_SUS_BASE_URL;
//     delete process.env.API_SUS_PORT;
//     const expectedUrl = 'http://localhost:3333/devices';

//     await fetchFromAPI(sampleEndpoint);

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//  ('should construct the correct URL when endpoint is empty', async () => {
//  const expectedUrl = 'http://localhost:3333';

//     await fetchFromAPI('');

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });

//   it('should construct the correct URL when endpoint starts with a slash', async () => {
//     const expectedUrl = 'http://localhost:3333/devices';

//     await fetchFromAPI('/devices');

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });

//   it('should construct the correct URL when endpoint does not start with a slash', async () => {
//     const expectedUrl = 'http://localhost:3333/devices';

//     await fetchFromAPI('devices');

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });

//   it('should construct the correct URL when endpoint contains query parameters', async () => {
//     const expectedUrl = 'http://localhost:3333/devices?organization=test';

//     await fetchFromAPI('/devices?organization=test');

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });

//   it('should construct the correct URL when endpoint contains special characters', async () => {
//     const expectedUrl = 'http://localhost:3333/devices?organization=%23%24%25%5E%26%2A';

//     await fetchFromAPI('/devices?organization=#$%^&*');

//     expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
//   });
// });
