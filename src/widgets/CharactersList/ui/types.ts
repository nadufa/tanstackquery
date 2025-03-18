import { Dispatch, SetStateAction } from "react";
import { ICharacter } from "../../entities/character";

export interface IVirtualCharactersList {
  data: ICharacter[];
  selectedCharacter: number | null;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
}
