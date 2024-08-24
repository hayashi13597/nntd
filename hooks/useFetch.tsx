import { dataTypes } from "@/app/page";
import { sortData } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

function useFetch() {
  const [data, setData] = useState<dataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const sortedData = sortData(res.data);
        setData(sortedData);
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useFetch;
