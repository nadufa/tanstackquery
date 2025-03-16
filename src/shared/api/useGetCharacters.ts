import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ISearchState } from "../../pages/HomePage/types";
import { ICharactersData } from "./types";

interface GetParamsType extends ISearchState {
  pageParam: number;
}

const getParams = ({
  genderValue,
  inputSelect,
  inputText,
  statusValue,
  pageParam,
}: GetParamsType) => {
  const params = [
    { condition: inputText, key: inputSelect?.value, value: inputText },
    {
      condition: statusValue && statusValue !== "all",
      key: "status",
      value: statusValue,
    },
    {
      condition: genderValue && genderValue !== "all",
      key: "gender",
      value: genderValue,
    },
    { condition: pageParam, key: "page", value: pageParam },
  ]
    .map(({ condition, key, value }) => {
      return `${condition ? `&${key}=${value}` : ""}`;
    })
    .join("")
    .slice(1);

  return params.length ? "/?" + params : "";
};

export const useGetCharacters = ({ inputSelect, ...rest }: ISearchState) => {
  return useInfiniteQuery({
    queryKey: ["characters", "list", inputSelect.value, ...Object.values(rest)],
    queryFn: ({ pageParam }) => {
      return axios.get<ICharactersData>(
        `/character${getParams({ ...rest, inputSelect, pageParam })}`,
        {
          baseURL: "https://rickandmortyapi.com/api",
        }
      );
    },
    select: (response) => {
      return {
        pages: response.pages.map(({ data }) => data),
        pageParams: response.pageParams,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.data.info.next) {
        return null;
      }
      return lastPageParam + 1;
    },
  });
};
