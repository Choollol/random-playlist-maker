import { WithRequired } from "@/lib/types/miscTypes";
import { Autocomplete } from "@mui/material";
import { ComponentProps } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = WithRequired<
  UseControllerProps<T>,
  "defaultValue"
> &
  ComponentProps<typeof Autocomplete>;

function ControlledAutocomplete<T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...autocompleteProps
}: Props<T>) {
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
}

export default ControlledAutocomplete;
