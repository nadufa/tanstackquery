import { ICharacter } from "./model";

export interface ICharactersData {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: ICharacter[];
}
