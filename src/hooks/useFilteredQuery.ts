import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFilteredQuery = (
  queryOptionCreator: (
    page: number,
    limit: number,
    search: string,
    filters: Record<string, string>
  ) => any,
  initialFilters: Record<string, string> = {}
) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

  const queryOptions = queryOptionCreator(
    page,
    limit,
    debouncedSearch,
    filters
  );
  const query = useQuery(queryOptions);

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    ...query,
    page,
    limit,
    search,
    filters,
    debouncedSearch,
    handleFilterChange,
    handleSearchChange,
    handlePageChange,
    handleLimitChange,
    setPage,
    setLimit,
    setSearch,
    setFilters,
  };
};
