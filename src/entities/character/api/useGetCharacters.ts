import { axiosInstance } from "@/shared/api";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ICharacter, ISearchState } from "../model";
import { getParams } from "./lib";
import { IGetParams } from "./lib/getParams";

const PAGE_LIMIT = 20;

const fetchCharacters = ({ pageParam, inputSelect, ...rest }: IGetParams) => {
  return axiosInstance.get<ICharacter[]>(
    `/characters${getParams({ ...rest, inputSelect, pageParam, limit: PAGE_LIMIT })}`
  );
};

export const selectCharacters = (
  response: InfiniteData<AxiosResponse<ICharacter[], unknown>, number>
) => {
  return {
    pages: response.pages.flatMap(({ data }) => data),
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
      if (lastPage.data.length < PAGE_LIMIT) {
        return null;
      }
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
  });
};
