const BASE_URL = import.meta.env.VITE_BASE_URL;
const WHATSAPP_BASE_URL = import.meta.env.VITE_WHATSAPP_BASE_URL || "http://localhost:8081";
const SERVER_MANAGEMENT_BASE_URL = import.meta.env.VITE_SERVER_MANAGEMENT_BASE_URL || "http://localhost:8082";
const UI_DEPLOY_BASE_URL = import.meta.env.VITE_UI_DEPLOY_BASE_URL || "http://localhost:8083";

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

 metrics: {
  socket: `${SERVER_MANAGEMENT_BASE_URL}/metrics`,
 },

 ui_deploy: {
  list: `${UI_DEPLOY_BASE_URL}/projects`,
  create: `${UI_DEPLOY_BASE_URL}/projects`,
  update: `${UI_DEPLOY_BASE_URL}/projects`,
  delete: `${UI_DEPLOY_BASE_URL}/projects`,
 },
};

export default API_ENDPOINTS;
