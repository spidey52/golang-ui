import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "antd";
import { useState } from "react";
import Refresh from "../components/Refresh";
import TableData from "../components/TableData";
import usePaginationHook from "../hooks/usePaginationHook";
import { Project, useProjectList } from "../hooks/useProject";

const columns: GridColDef<Project>[] = [
 { field: "id", headerName: "ID", width: 90 },
 { field: "title", headerName: "Title", width: 150 },
 { field: "description", headerName: "Description", width: 150 },
 { field: "domain", headerName: "Domain", width: 150 },
 {
  field: "action",
  headerName: "Action",
  width: 150,
  renderCell: ({ row }) => {
   return <RenderActions project={row} />;
  },
 },
];

const RenderActions = ({ project }: { project: Project }) => {
 const [open, setOpen] = useState(true);
 const handleDeploy = () => {
  console.log("Deploying project", project);
 };

 return (
  <Stack direction='row' spacing={1}>
   <Button variant='outlined' onClick={() => setOpen(true)}>
    Deploy
   </Button>
   <Dialog
    open={open}
    onClose={() => setOpen(false)}
    sx={{
     "& .MuiDialog-paper": {
      minWidth: 400,
     },
    }}
   >
    <DialogTitle>Deploy Project</DialogTitle>
    <Divider />
    <DialogContent>
     <Stack direction='column' spacing={2}>
      <TextField label='Title' variant='outlined' size='small' fullWidth value={project.title} />
      <TextField label='Domain' variant='outlined' size='small' fullWidth value={project.domain} />
      <TextField multiline minRows={2} label='Description' variant='outlined' size='small' fullWidth value={project.description} />

      <div>
       <p>Drag and drop files here or click to upload</p>
      </div>
     </Stack>
    </DialogContent>
    <Divider />
    <DialogActions>
     <Button variant='outlined' onClick={handleDeploy}>
      close
     </Button>

     <Button variant='outlined' onClick={handleDeploy}>
      Save
     </Button>
    </DialogActions>
   </Dialog>
  </Stack>
 );
};

const UiDeploy = () => {
 const { limit, setLimit, page, setPage } = usePaginationHook({});
 const { data, isLoading, isRefetching, refetch } = useProjectList({ limit, page });

 console.log(data);
 return (
  <Box>
   <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
    <Typography>Projects</Typography>

    <Stack direction='row' spacing={1}>
     <Button variant='outlined' size='small'>
      Add Project
     </Button>
     <TextField label='Search' variant='outlined' size='small' />
     <Refresh isLoading={isLoading || isRefetching} onClick={refetch} />
    </Stack>
   </Stack>
   <TableData columns={columns} rows={data?.projects || []} isLoading={false} limit={limit} setLimit={setLimit} setPage={setPage} page={page} total={data?.count} />
  </Box>
 );
};

export default UiDeploy;
