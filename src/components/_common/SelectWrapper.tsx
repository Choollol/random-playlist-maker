import { StyleProps } from "@/lib/styling/styling";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

type Props = {
  values: string[];
  defaultValue?: string;
  selectSx?: StyleProps;
  itemSx?: StyleProps;
} & Parameters<typeof Select>[0];

export default function SelectWrapper({
  values,
  defaultValue = "",
  selectSx,
  itemSx,
  ...other
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Select {...other} sx={selectSx} onChange={handleChange} value={value}>
      {values.map((value, index) => (
        <MenuItem key={index} value={value} sx={itemSx}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}
