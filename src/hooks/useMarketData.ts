import { useEffect, useState } from "react";
import api from "../services/api";

// use Market Data Hook
const useMarketData = (market: string) => {
  const [marketData, setMarketData] = useState([]); // Market Data State

  // Get Market Data from API and make it an array of objects sorted by volume
  const getData = async (market: string) => {
    try {
      let data: any = [];

      // Get data from API
      const response = await api.get("/data");
      let res: any;

      if (market === 'spot') {
        res = response.data.spot;
      } else if (market === 'futures') {
        res = response.data.futures;
      }

      // Convert object to array of objects
      data = Object.keys(res).map((key) => res[key]);
      data.sort((a: any, b: any) => b.volume - a.volume);

      // Return data
      return data;
    } catch (error) {
      // If error, log it and return empty array
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // Fetch and update data function
  const fetchAndUpdateData = async () => {
    const data = await getData(market);
    setMarketData(data);
  };

  // Fetch and update data on mount and every 5 seconds
  useEffect(() => {
    fetchAndUpdateData();

    const interval = setInterval(fetchAndUpdateData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [market]);

  // Return market data
  return marketData;
};

export default useMarketData;