const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log(BASE_URL);

const API_ENDPOINTS = {
 notifications: {
  list: `${BASE_URL}/notification-logs`,
 },
 api_logs: {
  list: `${BASE_URL}/api-logs`,
  url_filter: `${BASE_URL}/api-logs/urls`,
  user_filter: `${BASE_URL}/api-logs/users`,
 },
};

export default API_ENDPOINTS;
