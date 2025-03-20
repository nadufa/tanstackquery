import { axiosInstance } from "@/shared/api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICharacter } from "./model";

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
  return axiosInstance.get<ICharacter>(`/characters/${id}`, {
    signal,
  });
};

export const selectCharacter = (data: ICharacter) =>
  Object.fromEntries(
    Object.entries(data).filter((el) => typeof el[1] !== "object")
  ) as ICharacter;

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
