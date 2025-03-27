import { useCharacterSettingsStore } from "@/entities/character";
import { axiosInstance } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { IAddCharacterSchema } from "../model";

export const useAddNewCharacter = ({
  onSettled,
}: {
  onSettled: () => void;
}) => {
  const queryClient = useQueryClient();

  const setNotification = useCharacterSettingsStore(
    (state) => state.setNotification
  );

  const newId = uuidv4();

  return useMutation({
    mutationFn: (data: IAddCharacterSchema) =>
      axiosInstance.post(`/characters`, {
        ...data,
        id: newId,
        created: new Date().toISOString(),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["characters", "list"],
      });
      setNotification(`New character was added successfully!`);
    },
    onError: () => {
      setNotification(`Some error occured!`);
    },
    onSettled,
  });
};
