import React, { useEffect, useState } from "react";

const useFetch = (url, isId, method) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(url, {
          method: method,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);

        // Handle the condition based on isId
        const result = isId ? jsonData : jsonData.products || [];
        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, isId]); // Include isId in dependencies if it can change

  return { data, loading, error };
};

export default useFetch;
