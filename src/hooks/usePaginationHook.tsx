import { useEffect, useState } from "react";

type PaginationHookParams = {
 limit?: number;
 page?: number;
 search?: string;
};
const usePaginationHook = (params: PaginationHookParams) => {
 const [limit, setLimit] = useState<number>(params?.limit || 10);
 const [page, setPage] = useState<number>(params?.page || 0);
 const [search, setSearch] = useState<string>("");
 const [debouncedSearch, setDebouncedSearch] = useState<string>("");

 useEffect(() => {
  const handler = setTimeout(() => {
   setDebouncedSearch(search);
  }, 300);

  return () => {
   clearTimeout(handler);
  };
 }, [search]);

 return { limit, setLimit, page, setPage, search, setSearch, debouncedSearch };
};

export default usePaginationHook;
