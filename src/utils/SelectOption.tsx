import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SelectOption = ({
 value,
 onChange,
 width,
 values,
 label,
}: {
 value: string | null;
 onChange: (value: string) => void;
 width: string | number;
 values: { value: string; label: string }[];
 label: string;
}) => {
 return (
  <FormControl sx={{ width: width }} size='small'>
   <InputLabel id={`${label}-id`}>{label}</InputLabel>
   <Select
    labelId={`${label}-id`}
    id={`${label}-id`}
    value={value}
    label={label}
    onChange={(e) => {
     onChange(e.target.value as string);
    }}
   >
    {values.map((el) => {
     return (
      <MenuItem key={`${el.value}-${el.label}`} value={el.value}>
       {el.label}
      </MenuItem>
     );
    })}
   </Select>
  </FormControl>
 );
};
