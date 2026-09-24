import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";

import { StyleProps } from "@/lib/styling/styling";

type Props = {
  values: string[];
  defaultValue?: string;
  value?: string;
  selectSx?: StyleProps;
  itemSx?: StyleProps;
} & Parameters<typeof Select>[0];

export default function SelectWrapper({
  values,
  defaultValue,
  value,
  selectSx,
  itemSx,
  ...other
}: Props) {
  const handleChange = (event: SelectChangeEvent, child: ReactNode) => {
    other.onChange?.(event, child);
  };

  return (
    <Select
      {...other}
      sx={selectSx}
      onChange={handleChange}
      value={value}
      defaultValue={defaultValue}
    >
      {values.map((value, index) => (
        <MenuItem key={index} value={value} sx={itemSx}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}
