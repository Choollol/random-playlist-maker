import { Sort } from "@mui/icons-material";
import { Select, MenuItem } from "@mui/material";
import { ComponentProps } from "react";

import { createStyleGroup } from "@/lib/styling/styling";
import { sortOptions } from "@/lib/utils/searchUtils";

const styles = createStyleGroup({
  icon: {
    marginRight: 1,
  },
});

type Props = Required<Pick<ComponentProps<typeof Select>, "onChange" | "value">>;

export const SortSelect = ({ value, onChange }: Props) => {
  return (
    <Select onChange={onChange} value={value} startAdornment={<Sort sx={styles.icon} />}>
      {Object.entries(sortOptions).map(([id, option]) => (
        <MenuItem key={id} value={id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
};
