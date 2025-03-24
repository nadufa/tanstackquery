import { SegmentedControlProps } from "@mantine/core";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type ControlledSegmentedControlProps<T extends FieldValues> =
  UseControllerProps<T> &
    Omit<SegmentedControlProps, "value" | "onChange" | "updateValue">;
