import { Button, colors } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
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
  renderCell: (params) => {
   const value = params.value as string;
   return (
    <span
     style={{
      color: value === "SUCCESS" ? colors.green[500] : colors.red[500],
      backgroundColor: value === "SUCCESS" ? colors.green[100] : colors.red[100],
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "0.75rem",
      width: "100px",
      textAlign: "center",
      fontWeight: 600,
     }}
    >
     {value}
    </span>
   );
  },
 },
 {
  field: "template",
  headerName: "Template",
  width: 300,
 },
 {
  field: "created_at",
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
   return (
    <Button color='secondary' variant='outlined' onClick={() => console.log(params)}>
     message
    </Button>
   );
  },
 },
];

export default notificationLogColumns;
