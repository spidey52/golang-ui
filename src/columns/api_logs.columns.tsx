import { Chip, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import ApiUser from "../models/ApiUser";

const apiLogsColumns: GridColDef[] = [
 {
  field: "user",
  headerName: "User",
  width: 300,
  renderCell: (params) => {
   const value = params.value as ApiUser | undefined;
   if (!value) return "N/A";
   return (
    <Stack direction='row' spacing={1}>
     <Typography variant='body2' fontSize='10' color='black'>
      {value.name}{" "}
      <Chip
       label={
        <Typography variant='caption' fontSize='8'>
         {value.cp_code}
        </Typography>
       }
       sx={{
        fontSize: 8,
       }}
       variant='filled'
       color='warning'
       size='small'
      />
     </Typography>
    </Stack>
   );
  },
 },
 { field: "url", headerName: "Base URL", width: 300 },
 { field: "method", headerName: "Method", width: 140 },
 {
  field: "status",
  headerName: "Status",
  width: 140,
  renderCell: (params) => {
   const value = params.value as number;
   let color = "black";
   if (value >= 200 && value < 300) {
    color = "green";
   } else if (value >= 400 && value < 500) {
    color = "red";
   } else if (value >= 500 && value < 600) {
    color = "orange";
   } else if (value >= 300 && value < 400) {
    color = "blue";
   }
   return <span style={{ color }}>{value}</span>;
  },
 },
 {
  field: "duration",
  headerName: "Duration",
  width: 140,
  renderCell: (params) => {
   const value = params.value as number;
   let val = "";

   if (value < 1000) {
    val = `${value} ms`;
   } else {
    val = `${(value / 1000).toFixed(2)} s`;
   }

   return <Typography variant='body2'>{val}</Typography>;

   //  return `${(value / 1000).toFixed(2)} s`;
  },
 },
 {
  field: "createdAt",
  headerName: "Created At",
  width: 200,
  valueGetter: (params) => {
   const value = params.value as string;
   if (value) {
    const date = moment(value).format("DD-MM-YYYY HH:mm:ss");
    return date;
   }
   return "N/A";
  },
 },
];

export default apiLogsColumns;
