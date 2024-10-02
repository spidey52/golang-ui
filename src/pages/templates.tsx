import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Refresh from "../components/Refresh";
import TableData from "../components/TableData";
import { useApiUsersFilter } from "../hooks/useApiLogs";
import usePaginationHook from "../hooks/usePaginationHook";
import { useCreateWhatsappTemplate, useWhatsappTemplateList } from "../hooks/useWhatsappTemplate";
import handleApiError from "../utils/handleApiError";
import { SelectOption } from "../utils/SelectOption";
import RenderActions from "./actions";
import MessageSenderDialog from "./message_send_dialog";
import TemplateDetails from "./view_details";

const columns: GridColDef[] = [
 { field: "serial", headerName: "ID", width: 90 },
 { field: "name", headerName: "Name", width: 300 },
 { field: "title", headerName: "Title", width: 300 },
 { field: "description", headerName: "Description", width: 300 },
 {
  field: "variables",
  headerName: "Variables",
  width: 300,
  valueGetter: ({ value }) => {
   if (!value) return "";
   return value.join(", ");
  },
 },
 {
  field: "actions",
  headerName: "Actions",
  width: 300,

  renderCell: RenderActions,
 },
];

const CopyAllUserId = () => {
 const { data } = useApiUsersFilter();
 const phoneNumbers = async () => {
  try {
   const phoneNumbers = data?.map((user) => user.phone).join(", ") || "";
   await navigator.clipboard.writeText(phoneNumbers);

   toast.success("Phone numbers copied");
  } catch (error) {
   let message = "Error copying phone numbers";

   if (error instanceof Error) {
    message = message + error.message;
   }

   return toast.error(message);
  }
 };
 return <Button onClick={phoneNumbers}>Copy PhoneNumbers</Button>;
};

const CreateTemplate = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
 const [title, setTitle] = useState<string>("");
 const [description, setDescription] = useState<string>("");
 const [name, setName] = useState<string>("");
 const [componentForm, setComponentForm] = useState<{ type: string; value: string; key: string }>({ type: "body", value: "text", key: "" });
 const [components, setComponents] = useState<{ type: string; value: string; key: string }[]>([]);

 const addComponent = () => {
  // add validation here

  setComponents([...components, componentForm]);
 };

 const removeComponent = (index: number) => {
  setComponents(components.filter((_, i) => i !== index));
 };
 const { mutateAsync } = useCreateWhatsappTemplate();

 const createTemplate = async () => {
  // create template here
  try {
   const componentHeader = [];
   const componentBody = [];

   for (const component of components) {
    if (component.type === "header") {
     if (component.value === "text") {
      componentHeader.push({
       type: component.value,
       text: component.key,
      });
     } else {
      componentHeader.push({
       type: component.value,
       image: {
        link: component.key,
       },
      });
     }
    }
    if (component.type === "body") {
     if (component.value === "image") {
      componentBody.push({
       type: component.value,
       image: {
        link: component.key,
       },
      });
     } else {
      componentBody.push({
       type: component.value,
       text: component.key,
      });
     }
    }
   }

   const finalComponents = [];

   if (componentHeader.length > 0) {
    finalComponents.push({
     type: "header",
     parameters: componentHeader,
    });
   }

   if (componentBody.length > 0) {
    finalComponents.push({
     type: "body",
     parameters: componentBody,
    });
   }

   const body = {
    name: name,
    title: title,
    description: description,
    components: finalComponents,
    // components: components.map((component) => {
    //  return {
    //   type: component.type,
    //   parameters: [
    //    {
    //     type: component.value,
    //     text: component.key,
    //    },
    //   ],
    //  };
    // }),
   };

   await mutateAsync(body);
  } catch (error) {
   handleApiError(error);
   console.log(error);
  }
 };

 const isFormValid = useMemo(() => {
  return name.length > 0 && components.length > 0;
 }, [name, components]);

 return (
  <Dialog
   open={open}
   onClose={() => setOpen(false)}
   sx={{
    "& .MuiDialog-paper": {
     width: "600px",
    },
   }}
  >
   <DialogTitle>Create Template</DialogTitle>

   <Divider />

   <DialogContent>
    <Stack spacing={2} direction='column'>
     <TextField label='Title' variant='outlined' value={title} onChange={(e) => setTitle(e.target.value)} />
     <TextField label='Description' variant='outlined' value={description} onChange={(e) => setDescription(e.target.value)} minRows={3} multiline />

     <TextField label='Template Name' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} />

     <Stack direction='row' spacing={1}>
      <SelectOption
       value={componentForm.type}
       onChange={(val) => {
        setComponentForm({ ...componentForm, type: val });
       }}
       width={140}
       values={[
        { value: "header", label: "Header" },
        { label: "Body", value: "body" },
       ]}
       label={"Type"}
      />
      <SelectOption
       value={componentForm.value}
       onChange={(val) => {
        setComponentForm({ ...componentForm, value: val });
       }}
       width={140}
       values={[
        { value: "image", label: "Image" },
        { value: "text", label: "Text" },
       ]}
       label={"value"}
      />
      <TextField
       label='key'
       variant='outlined'
       value={componentForm.key}
       onChange={(e) => {
        setComponentForm({ ...componentForm, key: e.target.value });
       }}
      />

      <Button variant='contained' color='primary' onClick={addComponent}>
       +
      </Button>
     </Stack>

     <TableContainer>
      <Table size='small' stickyHeader>
       <TableHead>
        <TableRow>
         <TableCell>Param Type</TableCell>
         <TableCell>Value Type</TableCell>
         <TableCell>Value Type</TableCell>
         <TableCell>Actions</TableCell>
        </TableRow>
       </TableHead>

       <TableBody>
        {components.map((component, index) => {
         return (
          <TableRow key={index}>
           <TableCell>{component.type}</TableCell>
           <TableCell>{component.value}</TableCell>
           <TableCell>{component.key}</TableCell>
           <TableCell>
            <Button
             variant='contained'
             color='secondary'
             onClick={() => {
              removeComponent(index);
             }}
            >
             Remove
            </Button>
           </TableCell>
          </TableRow>
         );
        })}
       </TableBody>
      </Table>
     </TableContainer>
    </Stack>
   </DialogContent>

   <DialogActions>
    <Button onClick={() => setOpen(false)} color='error' variant='text'>
     cancel
    </Button>
    <Button onClick={createTemplate} color='success' variant='contained' disabled={isFormValid === false}>
     create
    </Button>
   </DialogActions>
  </Dialog>
 );
};

const Templates = () => {
 const { limit, setLimit, page, setPage } = usePaginationHook({});
 const [open, setOpen] = useState<boolean>(false);

 const { data, isLoading, isRefetching, refetch } = useWhatsappTemplateList();

 return (
  <Box>
   <CreateTemplate open={open} setOpen={setOpen} />
   <MessageSenderDialog />
   <TemplateDetails />
   <Stack spacing={2} sx={{ pb: 1, justifyContent: "space-between" }}>
    <Typography variant='h5'>Templates</Typography>
    <Stack spacing={2}>
     <CopyAllUserId />

     <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
      Create Template
     </Button>
     <Refresh isLoading={isLoading || isRefetching} onClick={refetch} />
    </Stack>
   </Stack>

   <TableData
    columns={columns}
    rows={
     data?.result.map((template, idx) => {
      return {
       ...template,
       id: template.id,
       name: template.name,
       serial: idx + 1,
      };
     }) || []
    }
    isLoading={false}
    limit={limit}
    setLimit={setLimit}
    page={page}
    setPage={setPage}
    total={undefined}
   />
  </Box>
 );
};

export default Templates;
