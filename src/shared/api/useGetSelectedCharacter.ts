import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ICaracter } from "./types";

export const useGetSelectedCharacter = ({
  selectedCharacterId,
}: {
  selectedCharacterId: number | null;
}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["characters", "id", selectedCharacterId],
    enabled: !!selectedCharacterId,
    queryFn: async ({ signal }: { signal: AbortSignal }) => {
      await queryClient.cancelQueries({
        queryKey: ["characters", "id"],
        predicate: ({ queryKey }) => {
          return queryKey[queryKey.length - 1] === String(selectedCharacterId);
        },
      });
      return axios.get<ICaracter>(`/character/${selectedCharacterId}`, {
        baseURL: "https://rickandmortyapi.com/api",
        signal: signal,
      });
    },
    select: ({ data }) => {
      return Object.fromEntries(
        Object.entries(data).filter((el) => typeof el[1] !== "object")
      );
    },
    retry: 1,
  });
};
