import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_ENDPOINTS from "../config/api_endpoints";
import ApiLogs from "../models/ApiLogs";
type PaginationParams = {
 page: number;
 limit: number;
 search: string;

 status?: string;

 startDate?: string;
 endDate?: string;
 method?: string;
 sortKey?: string;
};

const useApiLogsList = (params: PaginationParams) => {
 const fetchApiLogs = async () => {
  const response = await axios.get(API_ENDPOINTS.api_logs.list, {
   params: {
    page: params.page,
    limit: params.limit,
    search: params.search,
    status: params.status,
    startDate: params.startDate,
    endDate: params.endDate,
    method: params.method,
    sortKey: params.sortKey,
   },
  });
  return response.data;
 };

 return useQuery({
  queryKey: ["apiLogs", params],
  queryFn: fetchApiLogs,
  select: (data) => {
   return {
    count: data.count || 10,
    data: (data.logs || []) as ApiLogs[],
   };
  },
 });
};

const useApiDetails = (id: string | null) => {
 const fetchApiDetails = async () => {
  if (!id) return Promise.resolve({} as ApiLogs);
  const response = await axios.get(`${API_ENDPOINTS.api_logs.list}/${id}`);
  return response.data;
 };

 return useQuery({
  queryKey: ["apiLogs", id],
  queryFn: fetchApiDetails,

  select: (data) => data as ApiLogs,
  enabled: !!id,
 });
};

const useApiUrls = () => {
 const fetchApiUrls = async () => {
  const response = await axios.get(API_ENDPOINTS.api_logs.url_filter);
  return response.data;
 };

 return useQuery({
  queryKey: ["apiUrls"],
  staleTime: Infinity,
  queryFn: fetchApiUrls,
  select: (data) => (data.urls || []) as string[],
 });
};

export { useApiDetails, useApiLogsList, useApiUrls };
