import { axiosInstance } from "@/shared/api";
import { ISearchState } from "@/shared/types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getParams } from "./lib";
import { ICharactersData } from "./types";

const fetchCharacters = ({
  pageParam,
  inputSelect,
  ...rest
}: ISearchState & { pageParam: number }) => {
  return axiosInstance.get<ICharactersData>(
    `/character${getParams({ ...rest, inputSelect, pageParam })}`
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
