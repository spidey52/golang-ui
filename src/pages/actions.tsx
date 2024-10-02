import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { WhatsappTemplateResponse } from "../hooks/useWhatsappTemplate";
import { setMessagePayload, setViewTemplate } from "../store/slices/template.slice";

function RenderActions({ row }: { row: WhatsappTemplateResponse["result"][0] }) {
 const dispatch = useDispatch();

 const handleOpen = () => {
  dispatch(
   setMessagePayload({
    name: row.name,
    open: true,
    variables: row.variables,
   })
  );
 };

 const handleDetailsOpen = () => {
  console.log(row);
  dispatch(setViewTemplate({ view_template: row.id, template_details: JSON.stringify(row, null, 2) }));
 };

 return (
  <ButtonGroup>
   <Button variant='outlined' color='primary' onClick={handleDetailsOpen}>
    V
   </Button>
   <Button variant='outlined' color='info'>
    E
   </Button>
   <Tooltip title='Send Message'>
    <Button variant='outlined' color='warning' onClick={handleOpen}>
     S
    </Button>
   </Tooltip>
  </ButtonGroup>
 );
}

export default RenderActions;
