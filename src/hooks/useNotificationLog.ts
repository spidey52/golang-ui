import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_ENDPOINTS from "../config/api_endpoints";
import PaginationParams from "../models/PaginationParams";

type NotificationListParams = PaginationParams & {
 startDate?: string;
 endDate?: string;
 status?: string;
 template?: string;
};

const useNotificationLogList = (params: NotificationListParams) => {
 const fetchNotificationLogs = async () => {
  const response = await axios.get(API_ENDPOINTS.notifications.list, {
   params: params,
  });

  return response.data;
 };

 return useQuery({
  queryKey: ["notificationLogs", params],
  queryFn: fetchNotificationLogs,
  select: (data) => ({ logs: data.logs, total: data.count }),
 });
};

const useNotificationDetails = (notificationId: string | null) => {
 const fetchNotificationDetails = async () => {
  const response = await axios.get(`${API_ENDPOINTS.notifications.list}/${notificationId}`);
  return response.data;
 };

 return useQuery({
  queryKey: ["notificationDetails", notificationId],
  queryFn: fetchNotificationDetails,
  enabled: !!notificationId,
 });
};

export { useNotificationDetails, useNotificationLogList };
