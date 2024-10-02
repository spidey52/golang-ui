const BASE_URL = import.meta.env.VITE_BASE_URL;
const WHATSAPP_BASE_URL = import.meta.env.VITE_WHATSAPP_BASE_URL || "http://localhost:8081";

const API_ENDPOINTS = {
 notifications: {
  list: `${WHATSAPP_BASE_URL}/message-logs`,
 },
 api_logs: {
  list: `${BASE_URL}/api-logs`,
  url_filter: `${BASE_URL}/api-logs/urls`,
  user_filter: `${BASE_URL}/api-logs/users`,
 },

 templates: {
  list: `${WHATSAPP_BASE_URL}/templates`,
  create: `${WHATSAPP_BASE_URL}/templates`,
  update: `${WHATSAPP_BASE_URL}/templates`,
  delete: `${WHATSAPP_BASE_URL}/templates`,
  send_message: `${WHATSAPP_BASE_URL}/templates/send-message`,
 },
};

export default API_ENDPOINTS;
