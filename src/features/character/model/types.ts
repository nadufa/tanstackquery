export interface ICharacterSchema {
  name: string;
  type?: string;
  image?: string;
  species?:
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
  status: "alive" | "dead" | "unknown";
  gender: "female" | "male" | "genderless" | "unknown";
}
