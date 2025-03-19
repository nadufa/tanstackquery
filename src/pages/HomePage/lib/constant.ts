import { ISearchState } from "@/shared/types";

export const initialState: ISearchState = {
  inputText: "",
  inputSelect: {
    value: "name",
    label: "Name",
    disabled: false,
  },
  statusValue: "all",
  genderValue: "all",
};
