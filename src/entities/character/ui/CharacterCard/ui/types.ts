import { Dispatch, SetStateAction } from "react";

export interface ICharacterCard {
  id: number;
  name: string;
  image: string;
  selectedCharacter: number | null;
  size: number;
  start: number;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
}
