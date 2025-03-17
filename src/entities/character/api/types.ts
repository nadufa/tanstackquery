import { ICaracter } from "../../entities/character";

export interface ICharactersData {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: ICaracter[];
}
