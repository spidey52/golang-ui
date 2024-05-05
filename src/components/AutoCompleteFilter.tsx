import { Autocomplete, TextField } from "@mui/material";

type AutoCompleteFilterProps = {
 value: string;
 label: string;
 onChange: (value: string) => void;
 options: { label: string; value: string }[];
 width?: number;
};

const AutoCompleteFilter = (props: AutoCompleteFilterProps) => {
 // 👍 GOOD

 return (
  <Autocomplete
   size='small'
   clearOnBlur={false}
   sx={{ width: props.width || 200 }}
   options={props.options}
   value={props.options.find((o) => o.value === props.value) || null}
   renderInput={(params) => <TextField {...params} label={props.label} variant='outlined' />}
   onChange={(_, value) => {
    if (!value) return props.onChange("");
    props.onChange(value.value);
   }}
  />
 );
};

export default AutoCompleteFilter;
