import { Dispatch, SetStateAction } from "react";
import { ISearchState } from "../../../shared/types";

export interface ISearchBar {
  searchState: ISearchState;
  setSearchState: Dispatch<SetStateAction<ISearchState>>;
}
