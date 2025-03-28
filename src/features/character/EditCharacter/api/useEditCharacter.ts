import {
  GenderValueType,
  ICharacter,
  StatusValueType,
  useCharacterSettingsStore,
} from "@/entities/character";
import { axiosInstance } from "@/shared/api";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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

  const { inputSelect, ...rest } = useCharacterSettingsStore(
    (state) => state.searchState
  );

  return useMutation({
    mutationFn: (
      data:
        | IEditCharacterSchema
        | { status: StatusValueType; gender: GenderValueType }
    ) => axiosInstance.put(`/characters/${id}`, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["characters", "id", id],
      });

      setNotification(`Character ${name} was edited successfully!`);

      const newCharacterData: AxiosResponse<ICharacter, any> | undefined =
        queryClient.getQueryData(["characters", "id", id]);

      queryClient.setQueryData(
        ["characters", "list", inputSelect.value, ...Object.values(rest)],
        (
          response: InfiniteData<AxiosResponse<ICharacter[], unknown>, number>
        ) => {
          return {
            ...response,
            pages: response.pages.map((page) => ({
              ...page,
              data: page.data.map((el) =>
                el.id === id && newCharacterData ? newCharacterData.data : el
              ),
            })),
          };
        }
      );
    },
    onError: () => {
      setNotification(`Some error occured!`);
    },
    onSettled,
  });
};
