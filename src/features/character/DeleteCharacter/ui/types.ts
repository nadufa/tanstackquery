import { MouseEvent } from "react";

export interface IDeleteCharacter {
  name: string;
  id: number;
}

export type EventType = MouseEvent<HTMLButtonElement>;
