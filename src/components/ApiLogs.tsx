import { Dialog, DialogContent, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useMemo, useState } from "react";
import JsonView from "react-json-view-preview";
import { lightTheme } from "react-json-view-preview/light";
import apiLogsColumns from "../columns/api_logs.columns";
import { useApiDetails, useApiLogsList, useApiUrls, useApiUsersFilter } from "../hooks/useApiLogs";
import usePaginationHook from "../hooks/usePaginationHook";
import AutoCompleteFilter from "./AutoCompleteFilter";
import LoadingIndicator from "./Loading";
import Refresh from "./Refresh";
import SelectFilter from "./SelectFilter";
import TableData from "./TableData";

const initialState = {
 startDate: moment().startOf("day").format("YYYY-MM-DD"),
 endDate: moment().endOf("day").format("YYYY-MM-DD"),
 status: "",
 method: "",
 sortKey: "",
 userId: "",
 baseUrl: "",
};

const ApiLogsPage = () => {
 const [selectedId, setSelectedId] = useState<string | null>(null);
 const [filterState, setFilterState] = useState(initialState);
 const { limit, setLimit, page, setPage, search, setSearch, debouncedSearch } = usePaginationHook({ limit: 20, page: 0 });
 const { data, isLoading, isRefetching, refetch } = useApiLogsList({ page, limit, search: debouncedSearch, ...filterState });
 const { data: ApiLog, isLoading: isApiLogLoading } = useApiDetails(selectedId);
 const { data: ApiUsers } = useApiUsersFilter();
 const { data: ApiUrls } = useApiUrls();

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

 const userFilters = useMemo<{ label: string; value: string }[]>(() => {
  if (!ApiUsers) return [];
  return ApiUsers.map((user) => ({ label: user.name + " - " + user.cp_code, value: user.id }));
 }, [ApiUsers]);

 const urlFilters = useMemo<{ label: string; value: string }[]>(() => {
  if (!ApiUrls) return [];
  return ApiUrls.map((url) => ({ label: url, value: url }));
 }, [ApiUrls]);

 return (
  <>
   <Dialog open={!!selectedId} onClose={() => setSelectedId(null)}>
    <DialogContent sx={{ width: 500, height: 600 }}>{isApiLogLoading ? <LoadingIndicator /> : <JsonView value={ApiLog || {}} style={lightTheme} />}</DialogContent>
   </Dialog>

   <Toolbar>
    <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
     <Typography variant='h4'>API Logs</Typography>
     <Stack direction='row' spacing={0.5}>
      <AutoCompleteFilter width={200} value={filterState.userId} label='User Filter' onChange={(val) => changeFilterState("userId", val)} options={userFilters} />
      <AutoCompleteFilter width={200} value={filterState.baseUrl} label='Url Filter' onChange={(val) => changeFilterState("baseUrl", val)} options={urlFilters} />

      <DatePicker.RangePicker
       format={"YYYY-MM-DD"}
       value={[dayjs(filterState.startDate) || undefined, dayjs(filterState.endDate) || undefined] || undefined}
       //  value={[]}
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
   <TableData isLoading={isLoading} rows={parsedData} total={data?.count || 0} columns={columns} limit={limit} setLimit={setLimit} page={page} setPage={setPage} setSelectedId={setSelectedId} />
  </>
 );
};

export default ApiLogsPage;
