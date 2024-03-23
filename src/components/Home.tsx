import { Stack } from "@mui/material";
import { Button } from "antd";
import { useEffect, useState } from "react";
import ApiLogs from "./ApiLogs";
import NotificationLogs from "./NotificationLogs";

const HomePage = () => {
 const [selectedId, setSelectedId] = useState<"api" | "notification">(() => {
  const selectedPage = localStorage.getItem("selected-page") as "api" | "notification";
  return selectedPage || "api";
 });

 useEffect(() => {
  localStorage.setItem("selected-page", selectedId);
 }, [selectedId]);

 return (
  <>
   <>
    <Stack direction='row' spacing={1}>
     <Button
      type={selectedId === "api" ? "primary" : "default"}
      onClick={() => {
       setSelectedId("api");
      }}
     >
      Api Logs
     </Button>
     <Button
      type={selectedId === "notification" ? "primary" : "default"}
      onClick={() => {
       setSelectedId("notification");
      }}
     >
      Notification Logs
     </Button>
    </Stack>
   </>
   {selectedId === "api" ? <ApiLogs /> : <NotificationLogs />}
  </>
 );
};

export default HomePage;
