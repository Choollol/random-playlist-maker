import { Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { ComponentProps } from "react";

import { createStyleGroup } from "@/lib/styling/styling";

const styles = createStyleGroup({
  inputField: {
    width: "100%",
  },
});

interface Props {
  onChange: ComponentProps<typeof TextField>["onChange"];
  disabled: boolean;
}

export const SearchInput = ({ onChange, disabled }: Props) => {
  return (
    <TextField
      sx={styles.inputField}
      onChange={onChange}
      placeholder={
        !disabled
          ? "Search videos in your playlists"
          : "Search will be available once your data is retrieved"
      }
      disabled={disabled}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
