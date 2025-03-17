import { Dispatch, SetStateAction } from "react";
import { ICaracter } from "../../entities/character";

export interface IVirtualCharactersList {
  data: ICaracter[];
  refetch: () => void;
  selectedCharacter: number | null;
  isFetching: boolean;
  isError: boolean;
  setSelectedCharacter: Dispatch<SetStateAction<null | number>>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
