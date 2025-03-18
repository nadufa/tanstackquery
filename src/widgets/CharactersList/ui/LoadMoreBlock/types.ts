import { UseInfiniteQueryResult } from "@tanstack/react-query";

export type LoadMoreType = Pick<
  UseInfiniteQueryResult,
  "hasNextPage" | "fetchNextPage" | "isFetchingNextPage"
>;
