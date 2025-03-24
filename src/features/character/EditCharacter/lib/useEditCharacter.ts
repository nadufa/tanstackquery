import { ICharacter } from "@/entities/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editCharacterSchema } from "../../model";

export const useEditCharacter = (data: ICharacter) => {
  const { name, image, type, species } = data;

  return useForm({
    defaultValues: {
      name,
      type,
      image,
      species,
    },
    mode: "onChange",
    resolver: zodResolver(editCharacterSchema),
  });
};
