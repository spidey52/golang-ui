import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_ENDPOINTS from "../config/api_endpoints";
import PaginationParams from "../models/PaginationParams";

export type Project = {
 id: number;
 title: string;
 description: string;
 domain: string;
};

const useProjectList = (params: PaginationParams) => {
 const fetchApiLogs = async () => {
  const response = await axios.get(API_ENDPOINTS.ui_deploy.list, {
   params: {
    page: params.page,
    limit: params.limit,
    search: params.search,
   },
  });

  return response.data as { projects: Project[]; count: number };
 };

 return useQuery({
  queryKey: ["ui-projects", params],
  queryFn: fetchApiLogs,
  select: (data) => {
   return {
    count: data.count || 10,
    projects: data.projects || [],
   };
  },
 });
};

export { useProjectList };
