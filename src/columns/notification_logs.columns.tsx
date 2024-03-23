import { GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import moment from "moment";

const notificationLogColumns: GridColDef[] = [
 {
  field: "phone",
  headerName: "Phone",
  width: 200,
 },
 {
  field: "status",
  headerName: "Status",
  width: 140,
 },
 {
  field: "template",
  headerName: "Template",
  width: 300,
 },
 {
  field: "createdAt",
  headerName: "Created At",
  width: 200,
  valueGetter: (params) => {
   const value = params.value as string;
   return moment(value).format("DD-MM-YYYY HH:mm:ss");
  },
 },

 {
  field: "payload",
  headerName: "Payload",
  width: 150,
  renderCell: (params) => {
   return <Button onClick={() => console.log(params)}>payload</Button>;
  },
 },
 {
  field: "message",
  headerName: "Message",
  width: 300,
  renderCell: (params) => {
   return <Button onClick={() => console.log(params)}>message</Button>;
  },
 },
];

export default notificationLogColumns;
