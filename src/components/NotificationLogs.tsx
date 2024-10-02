import { Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import notificationLogColumns from "../columns/notification_logs.columns";
import { useNotificationLogList } from "../hooks/useNotificationLog";
import usePaginationHook from "../hooks/usePaginationHook";
import Refresh from "./Refresh";
import SelectFilter from "./SelectFilter";

import JsonView from "react-json-view-preview";
import NotificationLog from "../models/NotificationLog";
import TemplateAutoComplete from "../utils/tempalte_autocomplete";
import TableData from "./TableData";

const initialState = {
 startDate: dayjs().startOf("day").format("YYYY-MM-DD"),
 endDate: dayjs().endOf("day").format("YYYY-MM-DD"),
 status: "",
 template: "",
 sortKey: "",
};

const NotificationLogs = () => {
 const [selectedId, setSelectedId] = useState<string | null>(null);
 const [filterState, setFilterState] = useState(initialState);
 const { limit, setPage, setLimit, page, search, setSearch, debouncedSearch } = usePaginationHook({ limit: 20 });
 const { data, isLoading, isRefetching, refetch } = useNotificationLogList({ limit, page, search: debouncedSearch, ...filterState });

 const changeFilterState = (key: string, value: string) => {
  setFilterState((prev) => {
   return { ...prev, [key]: value };
  });
 };

 const parsedRows = useMemo(() => {
  if (data) {
   //  for (const item of data.logs) item.id = item.id;
   return data.logs;
  }

  return [];
 }, [data]);

 const selectedRow = useMemo(() => {
  const row = parsedRows.find((row: NotificationLog) => row.id === selectedId);
  if (!row) return { message: "", payload: "" };

  return {
   message: row.message || {},
   payload: row.payload || {},
  };
 }, [selectedId, parsedRows]);

 return (
  <>
   <Dialog
    open={!!selectedId}
    onClose={() => setSelectedId(null)}
    sx={{
     "& .MuiDialog-paper": {
      width: "800px",
      height: "auto",
     },
    }}
   >
    <DialogTitle></DialogTitle>
    <DialogContent sx={{ maxHeight: 600, width: 500 }}>
     <JsonView value={selectedRow} />
    </DialogContent>
   </Dialog>

   <Stack
    sx={{
     pb: 1,
     justifyContent: "space-between",
     alignItems: "center",
    }}
   >
    <Typography variant='h6'>Message Logs</Typography>
    <Stack direction='row' spacing={1}>
     <DatePicker.RangePicker
      format={"YYYY-MM-DD"}
      value={[dayjs(filterState.startDate) || undefined, dayjs(filterState.endDate) || undefined] || undefined}
      //  value={[]}
      onChange={(_, dateStrings) => {
       if (!dateStrings) return;
       if (!dateStrings[0] || !dateStrings[1]) return;
       setFilterState((prev) => {
        return {
         ...prev,
         startDate: dateStrings[0],
         endDate: dateStrings[1],
        };
       });
      }}
     />

     <TemplateAutoComplete
      params={{
       value: filterState.template,
       onChange: (val) => changeFilterState("template", val || ""),
       width: 200,
      }}
     />

     <SelectFilter
      width={100}
      label='status'
      value={filterState.status || ""}
      onChange={(val) => {
       changeFilterState("status", val);
      }}
      options={["SUCCESS", "FAILED"]}
     />

     <TextField label='Search' variant='outlined' value={search} onChange={(e) => setSearch(e.target.value)} size='small' />
     <Refresh onClick={refetch} isLoading={isLoading || isRefetching} />
    </Stack>
   </Stack>

   <TableData
    setSelectedId={(id: string) => setSelectedId(id)}
    rows={parsedRows}
    columns={notificationLogColumns}
    isLoading={isLoading || isRefetching}
    limit={limit}
    setLimit={setLimit}
    page={page}
    setPage={setPage}
    total={data?.total || 0}
   />
  </>
 );
};

export default NotificationLogs;
