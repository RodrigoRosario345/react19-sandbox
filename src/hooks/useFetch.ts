import { useEffect, useState } from "react";

type ErrorType = Error | null;
type Data<T> = T | null;

interface FetchProps {
  currentPage: number;
  limit?: number;
  getData: (currentPage: number, limit?: number) => Promise<Response>;
}

interface UseFetchProps<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export function useFetch<T>({
  currentPage,
  getData,
}: FetchProps): UseFetchProps<T> {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(currentPage);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  return { data, loading, error };
}
