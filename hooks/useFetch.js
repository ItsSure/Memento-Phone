import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useFetch(url, storageKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);

        // Guardar los datos en AsyncStorage
        await AsyncStorage.setItem(storageKey, JSON.stringify(json));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else if (error.message === "Failed to fetch") {
          const localData = await AsyncStorage.getItem(storageKey);
          if (localData) {
            setData(JSON.parse(localData));
          } else {
            setError(
              "Network error: Unable to fetch data and no local data available."
            );
          }
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url, storageKey]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Request has been cancelled.");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
