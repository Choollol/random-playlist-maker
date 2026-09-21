import { ControlledInput } from "@/lib/types/utilTypes";
import { Autocomplete } from "@mui/material";
import { ComponentProps } from "react";
import { Controller } from "react-hook-form";

const ControlledAutocomplete: ControlledInput<
  ComponentProps<typeof Autocomplete>
> = ({ name, control, defaultValue, ...autocompleteProps }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Autocomplete
          {...field}
          {...autocompleteProps}
          onChange={(_, value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
