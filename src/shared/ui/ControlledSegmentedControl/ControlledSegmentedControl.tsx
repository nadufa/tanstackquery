import { SegmentedControl } from "@mantine/core";
import { FieldValues, useController } from "react-hook-form";
import { ControlledSegmentedControlProps } from "./types";

export const ControlledSegmentedControl = <T extends FieldValues>({
  name,
  control,
  ...restProps
}: ControlledSegmentedControlProps<T>) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <SegmentedControl
      {...restProps}
      {...field}
      name={name}
      onChange={field.onChange}
    />
  );
};
