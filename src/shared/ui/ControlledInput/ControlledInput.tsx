import { TextInput } from "@mantine/core";
import { FieldValues, useController } from "react-hook-form";
import { ControlledInputProps } from "./types";

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextInput {...restProps} {...field} error={error?.message} name={name} />
  );
};
