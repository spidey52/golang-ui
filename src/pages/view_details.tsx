import { Dialog, DialogContent } from "@mui/material";
import JsonView from "react-json-view-preview";
import { darkTheme } from "react-json-view-preview/dark";
import { lightTheme } from "react-json-view-preview/light";
import { useDispatch, useSelector } from "react-redux";
import { setViewTemplate } from "../store/slices/template.slice";
import { RootState } from "../store/store";

const TemplateDetails = () => {
 const { mode } = useSelector((state: RootState) => state.themeReducer);
 const { view_template, template_details } = useSelector((state: RootState) => state.templateReducer);
 const dispatch = useDispatch();

 const handleClose = () => {
  dispatch(setViewTemplate({ view_template: null, template_details: "" }));
 };

 return (
  <Dialog
   open={Boolean(view_template)}
   onClose={handleClose}
   sx={{
    "& .MuiDialog-paper": {
     width: "800px",
     height: "auto",
    },
   }}
  >
   <DialogContent>
    <JsonView value={template_details ? JSON.parse(template_details as string) : {}} style={mode === "light" ? lightTheme : darkTheme} />
   </DialogContent>
  </Dialog>
 );
};

export default TemplateDetails;
