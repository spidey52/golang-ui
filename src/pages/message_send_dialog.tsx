import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useSendMessage } from "../hooks/useWhatsappTemplate";
import { setMessagePayload } from "../store/slices/template.slice";
import { RootState } from "../store/store";
import handleApiError from "../utils/handleApiError";

function MessageSenderDialog() {
 const {
  message_payload: { name, open, variables },
 } = useSelector((state: RootState) => state.templateReducer);

 const dispatch = useDispatch();

 const [values, setValues] = useState<{ [key: string]: string }>({});
 const [phone, setPhone] = useState<string>("");

 const { mutateAsync, isPending } = useSendMessage();

 const handleClose = () => {
  dispatch(setMessagePayload({ name: "", open: false, variables: [] }));
 };

 const handleSendMesssage = async () => {
  try {
   const phoneNumbers = phone
    .split(",")
    .map((phone) => phone.trim())
    .filter((phone) => phone.length === 10);

   console.log(phoneNumbers);
   if (phoneNumbers.length === 0) {
    // alert("Please enter phone number");
    toast.error("Please enter phone number");
    return;
   }

   for (const key in values) {
    if (values[key] === "") {
     toast.error(`Please enter ${key}`);
     return;
    }
   }

   await mutateAsync({
    variables: values,
    phone: phoneNumbers,
    id: name,
   });

   toast.success("Message sent");
  } catch (error) {
   handleApiError(error);
  }
 };
 return (
  <Dialog
   open={open}
   onClose={handleClose}
   sx={{
    "& .MuiDialog-paper": {
     width: "600px",
    },
   }}
  >
   <DialogTitle>
    <Stack sx={{ justifyContent: "space-between" }}>
     <Typography variant='h6'>Send Message</Typography>

     <Typography variant='h6'>{name}</Typography>
    </Stack>
   </DialogTitle>
   <Divider />
   <DialogContent>
    <Stack spacing={2} direction='column'>
     {variables.map((variable) => (
      <TextField
       value={values[variable] || ""}
       onChange={(e) => setValues({ ...values, [variable]: e.target.value })}
       label={variable}
       variant='outlined'
       placeholder={`Enter ${variable}`}
       key={variable}
      />
     ))}

     <TextField label='Phone Number' variant='outlined' multiline minRows={3} placeholder='Enter phone number separated by comma' value={phone} onChange={(e) => setPhone(e.target.value)} />
    </Stack>
   </DialogContent>
   <Divider />
   <DialogActions>
    <Button color='error' variant='text' onClick={handleClose}>
     Cancel
    </Button>
    <Button color='success' variant='contained' onClick={handleSendMesssage} disabled={isPending}>
     Send
    </Button>
   </DialogActions>
  </Dialog>
 );
}

export default MessageSenderDialog;
