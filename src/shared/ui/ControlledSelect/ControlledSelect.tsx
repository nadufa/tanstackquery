import { Select } from "@mantine/core";
import { FieldValues, useController } from "react-hook-form";
import { ControlledSelectProps } from "./types";

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      {...restProps}
      {...field}
      error={error?.message}
      onChange={field.onChange}
    />
  );
};
