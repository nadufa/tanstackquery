import { ReactNode } from "react";

export interface IWithQueryStatus {
  isLoading: boolean;
  isError: boolean;
  isEmptyData?: boolean;
  emptyDataLabel?: string;
  errorBlockChildren?: ReactNode
}
