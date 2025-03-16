import { ComboboxItem } from "@mantine/core";

export type StatusValueType = "all" | "alive" | "dead" | "unknown";
export type GenderValueType =
  | "all"
  | "female"
  | "male"
  | "genderless"
  | "unknown";

export interface ISearchState {
  inputText: string;
  inputSelect: ComboboxItem;
  statusValue: StatusValueType;
  genderValue: GenderValueType;
}
