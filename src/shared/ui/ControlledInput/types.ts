import { TextInputProps } from "@mantine/core";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type ControlledInputProps<T extends FieldValues> =
  UseControllerProps<T> & Omit<TextInputProps, "value" | "onChange">;
