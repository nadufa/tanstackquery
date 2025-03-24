import { ICharacter } from "@/entities/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { characterSchema } from "../../model";

export const useEditCharacter = (data: ICharacter) => {
  const { name, gender, image, type, status, species } = data;

  return useForm({
    defaultValues: {
      name,
      type,
      image,
      species,
      status,
      gender,
    },
    mode: "onSubmit",
    resolver: zodResolver(characterSchema),
  });
};
