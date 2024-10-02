import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_ENDPOINTS from "../config/api_endpoints";

export type WhatsappTemplateResponse = {
 result: Array<{
  id: string;
  title: string;
  description: string;
  variables: string[];
  name: string;
  language: {
   code: string;
  };
  components: Array<{
   type: string;
   parameters: Array<{
    type: string;
    image?: {
     link: string;
    };
    text?: string;
   }>;
  }>;
 }>;
};

const useWhatsappTemplateList = () => {
 const fetchWhatsappTemplateList = async () => {
  const response = await axios.get(API_ENDPOINTS.templates.list);
  return response.data as WhatsappTemplateResponse;
 };

 return useQuery({
  queryKey: ["whatsappTemplates"],
  queryFn: fetchWhatsappTemplateList,
 });
};

const useCreateWhatsappTemplate = () => {
 const createWhatsappTemplate = async (data: unknown) => {
  const response = await axios.post(API_ENDPOINTS.templates.create, data);
  return response.data;
 };
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: createWhatsappTemplate,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["whatsappTemplates"] });
  },
 });
};

const useUpdateWhatsappTemplate = () => {
 const updateWhatsappTemplate = async (data: unknown) => {
  const response = await axios.put(API_ENDPOINTS.templates.update, data);
  return response.data;
 };
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: updateWhatsappTemplate,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["whatsappTemplates"] });
  },
 });
};

const useDeleteWhatsappTemplate = () => {
 const deleteWhatsappTemplate = async (id: string) => {
  const response = await axios.delete(`${API_ENDPOINTS.templates.delete}/${id}`);
  return response.data;
 };
 const queryClient = useQueryClient();

 return useMutation({
  mutationFn: deleteWhatsappTemplate,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["whatsappTemplates"] });
  },
 });
};

const useSendMessage = () => {
 const sendMessage = async (data: unknown) => {
  const response = await axios.post(API_ENDPOINTS.templates.send_message, data);

  return response.data;
 };
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: sendMessage,
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ["whatsappTemplates"] });
  },
 });
};

export { useCreateWhatsappTemplate, useDeleteWhatsappTemplate, useSendMessage, useUpdateWhatsappTemplate, useWhatsappTemplateList };
