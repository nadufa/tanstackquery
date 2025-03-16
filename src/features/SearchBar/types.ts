import { Dispatch, SetStateAction } from "react";
import { ISearchState } from "../../pages/HomePage/types";

export interface ISearchBar {
  searchState: ISearchState;
  setSearchState: Dispatch<SetStateAction<ISearchState>>;
}
