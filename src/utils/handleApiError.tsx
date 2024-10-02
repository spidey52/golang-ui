import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleApiError = (error: any) => {
 let message = "An error occurred";

 if (error.response && error.response.data) {
  const errorMessage = `${error.response.data.message || ""} ${error.response.data.error}`.trim();
  message += `\n${errorMessage}`;
 }

 toast.error(message);
};

export default handleApiError;
