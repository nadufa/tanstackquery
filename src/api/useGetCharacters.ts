import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICharactersData } from "./types";

export const useGetCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => {
      return axios.get<ICharactersData>("/character", {
        baseURL: "https://rickandmortyapi.com/api",
      });
    },
    select: (response) => response.data,
  });
};
