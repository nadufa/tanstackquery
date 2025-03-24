import { z } from "zod";

const SPECIES = [
  "Human",
  "Alien",
  "Humanoid",
  "unknown",
  "Poopybutthole",
  "Mythological Creature",
  "Animal",
  "Robot",
  "Cronenberg",
  "Disease",
] as const;
const STATUS = ["alive", "dead", "unknown"] as const;
const GENDER = ["female", "male", "genderless", "unknown"] as const;

export const baseCharacterSchema = z.object({
  name: z.string().trim().min(3, "Min length 3").max(30, "Max length 30"),
  type: z
    .string()
    .trim()
    .min(3, "Min length 3")
    .max(30, "Max length 30")
    .optional()
    .or(z.string().trim().max(0)),
  image: z
    .string()
    .trim()
    .url({ message: "Invalid url" })
    .optional()
    .or(z.string().trim().max(0, { message: "Invalid url" })),
  species: z.enum(SPECIES, { message: "Species is required" }),
  status: z.enum(STATUS, { message: "Status is required" }),
  gender: z.enum(GENDER, { message: "Gender is required" }),
});

export const addCharacterSchema = baseCharacterSchema;

export const editCharacterSchema = baseCharacterSchema.omit({
  status: true,
  gender: true,
});
