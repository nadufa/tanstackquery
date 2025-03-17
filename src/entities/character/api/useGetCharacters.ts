import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ISearchState } from "../../../shared/types";
import { getParams } from "./lib";
import { ICharactersData } from "./types";

const fetchCharacters = ({
  pageParam,
  inputSelect,
  ...rest
}: ISearchState & { pageParam: number }) => {
  return axios.get<ICharactersData>(
    `/character${getParams({ ...rest, inputSelect, pageParam })}`,
    {
      baseURL: import.meta.env.VITE_BASE_URL,
    }
  );
};

export const selectCharacters = (
  response: InfiniteData<AxiosResponse<ICharactersData, unknown>, number>
) => {
  return {
    pages: response.pages.map(({ data }) => data),
    pageParams: response.pageParams,
  };
};

export const useGetCharacters = ({ inputSelect, ...rest }: ISearchState) => {
  return useInfiniteQuery({
    queryKey: ["characters", "list", inputSelect.value, ...Object.values(rest)],
    queryFn: ({ pageParam }) =>
      fetchCharacters({ pageParam, inputSelect, ...rest }),
    select: selectCharacters,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data.info.next) {
        return null;
      }
      return lastPageParam + 1;
    },
  });
};
