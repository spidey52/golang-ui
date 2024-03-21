// const BASE_URL = "http://192.168.64.2:8080";
const BASE_URL = "http://localhost:8080";

const API_ENDPOINTS = {
 notifications: {
  list: `${BASE_URL}/notifications`,
 },
 api_logs: {
  list: `${BASE_URL}/api-logs`,
  url_filter: `${BASE_URL}/api-urls`,
 },
};

export default API_ENDPOINTS;
