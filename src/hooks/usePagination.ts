import { useCallback, useState } from "react";

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return { currentPage, goToPage };
}
