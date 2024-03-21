import { Dialog, DialogContent, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, DatePicker } from "antd";
import { useMemo, useState } from "react";
import JsonView from "react-json-view-preview";
import { lightTheme } from "react-json-view-preview/light";
import apiLogsColumns from "../columns/api_logs.columns";
import { useApiDetails, useApiLogsList } from "../hooks/useApiLogs";
import usePaginationHook from "../hooks/usePaginationHook";
import LoadingIndicator from "./Loading";
import Refresh from "./Refresh";
import SelectFilter from "./SelectFilter";

const initialState = {
 startDate: "",
 endDate: "",
 status: "",
 method: "",
 sortKey: "",
};

const Home = () => {
 const [selectedId, setSelectedId] = useState<string | null>(null);
 const [filterState, setFilterState] = useState(initialState);
 const { limit, setLimit, page, setPage, search, setSearch, debouncedSearch } = usePaginationHook({ limit: 20, page: 0 });
 const { data, isLoading, isRefetching, refetch } = useApiLogsList({ page, limit, search: debouncedSearch, ...filterState });
 const { data: ApiLog, isLoading: isApiLogLoading } = useApiDetails(selectedId);

 const changeFilterState = (key: string, value: string) => {
  setFilterState((prev) => {
   return { ...prev, [key]: value };
  });
 };

 const parsedData = useMemo(() => {
  if (data) {
   for (const item of data.data) item.id = item._id;
   return data.data;
  }
  return [];
 }, [data]);

 const columns = useMemo(() => {
  const cols: GridColDef[] = [...apiLogsColumns];
  cols.push({
   field: "actions",
   headerName: "Actions",
   width: 200,
   renderCell: (params) => {
    return <Button onClick={() => setSelectedId(params.row.id as string)}>Details</Button>;
   },
  });

  return cols;
 }, []);

 return (
  <>
   <Dialog open={!!selectedId} onClose={() => setSelectedId(null)}>
    <DialogContent sx={{ width: 600, height: 600 }}>{isApiLogLoading ? <LoadingIndicator /> : <JsonView value={ApiLog || {}} style={lightTheme} />}</DialogContent>
   </Dialog>

   <Toolbar>
    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
     <Typography variant='h4'>API Logs</Typography>
     <Stack direction='row' spacing={0.5}>
      <DatePicker.RangePicker
       format={"YYYY-MM-DD"}
       onChange={(_, dateStrings) => {
        setFilterState((prev) => {
         return {
          ...prev,
          startDate: dateStrings[0],
          endDate: dateStrings[1],
         };
        });
       }}
      />
      <SelectFilter
       width={100}
       label='status'
       value={filterState.status || ""}
       onChange={(val) => {
        changeFilterState("status", val);
       }}
       options={["200", "400", "500", "304", "404", "401"]}
      />

      <SelectFilter
       width={100}
       label='Method'
       value={filterState.method || ""}
       onChange={(val) => {
        changeFilterState("method", val);
       }}
       options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
      />

      <SelectFilter
       width={100}
       label='Sort By'
       value={filterState.sortKey || ""}
       onChange={(val) => {
        changeFilterState("sortKey", val);
       }}
       options={["baseUrl", "method", "status", "duration", "createdAt"]}
      />

      <TextField label='Search' variant='outlined' value={search} onChange={(e) => setSearch(e.target.value)} size='small' />
      <Refresh onClick={refetch} isLoading={isLoading || isRefetching} />
     </Stack>
    </Stack>
   </Toolbar>
   <DataGrid
    sx={{
     height: "80vh",
    }}
    pageSizeOptions={[10, 20, 30, 50, 100]}
    initialState={{
     pagination: {
      paginationModel: {
       pageSize: limit,
      },
     },
    }}
    isRowSelectable={() => false}
    onRowClick={(params) => {
     setSelectedId(params.row.id as string);
    }}
    loading={isLoading}
    pagination={true}
    paginationMode='server'
    rowCount={data?.count || 0}
    onPaginationModelChange={(params) => {
     console.log(params);
     if (params.pageSize) {
      setLimit(params.pageSize);
     }

     if (params.page !== undefined) {
      setPage(params.page);
     }
    }}
    rows={parsedData}
    columns={columns}
   />
  </>
 );
};

export default Home;
