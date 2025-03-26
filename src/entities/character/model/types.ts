import { ComboboxItem } from "@mantine/core";
import { ChangeEvent } from "react";

export type StatusValueType = "all" | "Alive" | "Dead" | "unknown";
export type GenderValueType =
  | "all"
  | "Female"
  | "Male"
  | "Genderless"
  | "unknown";

export interface ICharacter {
  created: string;
  episode: string[];
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species:
    | "Human"
    | "Alien"
    | "Humanoid"
    | "unknown"
    | "Poopybutthole"
    | "Mythological Creature"
    | "Animal"
    | "Robot"
    | "Cronenberg"
    | "Disease";
  status: Exclude<StatusValueType, "all">;
  gender: Exclude<GenderValueType, "all">;
  type: string;
  url: string;
}

export interface ISearchState {
  inputText: string;
  inputSelect: ComboboxItem;
  statusValue: StatusValueType;
  genderValue: GenderValueType;
}

export interface ICharacterSettings {
  searchState: ISearchState;
  selectedId: number | null;
  notification: string | null;
  setSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearchSelect: (option: ComboboxItem) => void;
  setSearchStatus: (value: string) => void;
  setSearchGender: (value: string) => void;
  setSelectedId: (newId: number | null) => void;
  setNotification: (value: string | null) => void;
}
