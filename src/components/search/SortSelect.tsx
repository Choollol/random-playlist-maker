import { Select, MenuItem } from "@mui/material";
import { ComponentProps } from "react";

import { sortOptions } from "@/lib/utils/searchUtils";

type Props = Required<Pick<ComponentProps<typeof Select>, "onChange" | "value">>;

export const SortSelect = ({ value, onChange }: Props) => {
  return (
    <Select onChange={onChange} value={value}>
      {Object.entries(sortOptions).map(([id, option]) => (
        <MenuItem key={id} value={id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};
