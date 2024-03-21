import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type SelectFilterProps = {
 width?: number;
 value: string;
 label: string;
 onChange: (value: string) => void;
 options: string[];
};
const SelectFilter = (props: SelectFilterProps) => {
 return (
  <FormControl sx={{ minWidth: props.width }} size='small'>
   <InputLabel id={`${props.label}-id`}>{props.label}</InputLabel>
   <Select value={props.value} autoWidth onChange={(e) => props.onChange(e.target.value)} size='small' label={props.label} labelId={`${props.label}-id`} id={`${props.label}`}>
    <MenuItem value=''>
     {" "}
     <em>None</em>{" "}
    </MenuItem>

    {props.options.map((option) => (
     <MenuItem key={option} value={option}>
      {option}
     </MenuItem>
    ))}
   </Select>
  </FormControl>
 );
};

export default SelectFilter;
