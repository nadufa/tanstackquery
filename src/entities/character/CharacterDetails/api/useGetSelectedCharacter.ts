import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ICaracter } from "../model";

export const fetchSelectedCharacter = ({
  queryClient,
  signal,
  id,
}: {
  queryClient: QueryClient;
  signal: AbortSignal;
  id: number | null;
}) => {
  queryClient.cancelQueries({
    queryKey: ["characters", "id"],
    predicate: ({ queryKey }) => {
      return queryKey[queryKey.length - 1] === String(id);
    },
  });
  return axios.get<ICaracter>(`/character/${id}`, {
    baseURL: import.meta.env.VITE_BASE_URL,
    signal: signal,
  });
};
export const selectCharacter = (data: ICaracter) =>
  Object.fromEntries(
    Object.entries(data).filter((el) => typeof el[1] !== "object")
  );

export const useGetSelectedCharacter = ({
  selectedCharacterId,
}: {
  selectedCharacterId: number | null;
}) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["characters", "id", selectedCharacterId],
    enabled: !!selectedCharacterId,
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchSelectedCharacter({ queryClient, signal, id: selectedCharacterId }),
    select: ({ data }) => selectCharacter(data),
    retry: 1,
  });
};
