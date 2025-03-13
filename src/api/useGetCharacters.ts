import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ISearchState } from "../Container/types";
import { ICharactersData } from "./types";

const getParams = ({
  activePage,
  genderValue,
  inputSelect,
  inputText,
  statusValue,
}: ISearchState) => {
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
    { condition: activePage, key: "page", value: activePage },
  ]
    .map(({ condition, key, value }) => {
      return `${condition ? `&${key}=${value}` : ""}`;
    })
    .join("")
    .slice(1);

  return params.length ? "/?" + params : "";
};

export const useGetCharacters = ({ inputSelect, ...rest }: ISearchState) => {
  return useQuery({
    queryKey: ["characters", "list", inputSelect.value, ...Object.values(rest)],
    queryFn: () => {
      return axios.get<ICharactersData>(
        `/character${getParams({ ...rest, inputSelect })}`,
        {
          baseURL: "https://rickandmortyapi.com/api",
        }
      );
    },
    select: (response) => response.data,
    retry: 1,
  });
};
