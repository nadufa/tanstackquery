import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { characterSchema } from "../../model";

export const useAddNewCharacter = () => {
  return useForm({
    defaultValues: {
      name: "",
      type: "",
      image: "",
      species: "unknown",
      status: "unknown",
      gender: "unknown",
    },
    mode: "onChange",
    resolver: zodResolver(characterSchema),
  });
};
