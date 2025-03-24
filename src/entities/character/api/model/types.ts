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
  status: "alive" | "dead" | "unknown";
  gender: "female" | "male" | "genderless" | "unknown";
  type: string;
  url: string;
}
