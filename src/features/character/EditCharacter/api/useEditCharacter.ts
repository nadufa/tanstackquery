import { useCharacterSettingsStore } from "@/entities/character";
import { axiosInstance } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEditCharacterSchema } from "../model";

export const useEditCharacter = ({
  id,
  name,
  onSettled,
}: {
  id: number;
  name: string;
  onSettled: () => void;
}) => {
  const queryClient = useQueryClient();

  const setNotification = useCharacterSettingsStore(
    (state) => state.setNotification
  );

  return useMutation({
    mutationFn: (data: IEditCharacterSchema) =>
      axiosInstance.put(`/characters/${id}`, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["characters"],
      });
      setNotification(`Character ${name} was edited successfully!`);
    },
    onError: () => {
      setNotification(`Some error occured!`);
    },
    onSettled,
  });
};
