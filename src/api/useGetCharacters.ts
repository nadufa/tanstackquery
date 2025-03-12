import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ISearchState } from "../Container/Container";
import { ICharactersData } from "./types";

export const useGetCharacters = ({
  genderValue,
  inputSelect,
  inputText,
  statusValue,
}: ISearchState) => {
  return useQuery({
    queryKey: [
      "characters",
      "list",
      genderValue,
      inputSelect,
      inputText,
      statusValue,
    ],
    queryFn: () => {
      return axios.get<ICharactersData>(
        `/character/?${inputText ? `${inputSelect?.value}=${inputText}` : ""}${statusValue !== "all" ? `&status=${statusValue}` : ""}${genderValue !== "all" ? `&gender=${genderValue}` : ""}
        `,
        {
          baseURL: "https://rickandmortyapi.com/api",
        }
      );
    },
    select: (response) => response.data,
    retry: 1,
  });
};
