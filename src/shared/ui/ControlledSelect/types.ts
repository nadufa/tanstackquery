import { SelectProps } from "@mantine/core";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type ControlledSelectProps<T extends FieldValues> =
  UseControllerProps<T> &
    Omit<SelectProps, "value" | "onChange" | "updateValue">;
