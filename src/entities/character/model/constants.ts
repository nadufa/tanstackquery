import { ISearchState } from "./types";

export const initialState: ISearchState = {
  inputText: "",
  inputSelect: {
    value: "Name",
    label: "Name",
    disabled: false,
  },
  statusValue: "all",
  genderValue: "all",
};
