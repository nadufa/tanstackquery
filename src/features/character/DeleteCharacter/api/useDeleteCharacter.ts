import { useCharacterSettingsStore } from "@/entities/character";
import { axiosInstance } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IDeleteCharacter } from "./types";

export const useDeleteCharacter = ({
  name,
  id,
  onSettled,
}: IDeleteCharacter) => {
  const queryClient = useQueryClient();
  const setSelectedId = useCharacterSettingsStore(
    (state) => state.setSelectedId
  );
  const setNotification = useCharacterSettingsStore(
    (state) => state.setNotification
  );
  return useMutation({
    onSuccess: () => {
      setSelectedId(null);
      queryClient.invalidateQueries({ queryKey: ["characters", "list"] });
      setNotification(`Character ${name} was deleted successfully!`);
    },
    mutationFn: () => {
      return axiosInstance.delete(`/characters/${id}`);
    },
    onError: () => {
      setNotification(`Some error occured!`);
    },
    onSettled,
  });
};
