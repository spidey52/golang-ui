import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { useWhatsappTemplateList } from "../hooks/useWhatsappTemplate";

type params = {
 value: string | null;
 onChange: (value: string | null) => void;
 width?: string | number;
};
const TemplateAutoComplete = ({ params }: { params: params }) => {
 const { data, isLoading, isRefetching } = useWhatsappTemplateList();

 const options = useMemo(() => {
  if (data) {
   return data.result.map((item) => item.name);
  }
  return [];
 }, [data]);

 return (
  <Autocomplete
   loading={isLoading || isRefetching}
   options={options}
   getOptionLabel={(option) => option}
   style={{
    width: params.width || 300,
   }}
   renderInput={(params) => <TextField {...params} label='Template' variant='outlined' />}
   onChange={(_, value) => params.onChange(value)}
  />
 );
};

export default TemplateAutoComplete;
