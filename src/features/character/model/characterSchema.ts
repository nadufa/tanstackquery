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
const STATUS = ["Alive", "Dead", "unknown"] as const;
const GENDER = ["Female", "Male", "Genderless", "unknown"] as const;

export const baseCharacterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Min length 3")
    .max(30, "Max length 30")
    .refine(
      (value) => {
        const arr = value.split(" ");
        if (arr.length === 2) {
          if (
            arr[0][0] === arr[0][0].toUpperCase() &&
            arr[1][0] === arr[1][0].toUpperCase()
          ) {
            const restArr1 = arr[0].split("");
            const restArr2 = arr[1].split("");
            restArr1.shift();
            restArr2.shift();
            if (
              restArr1.join() === restArr1.join().toLowerCase() &&
              restArr2.join() === restArr2.join().toLowerCase()
            ) {
              return true;
            }
          }
        }
        return false;
      },
      { message: "Invalid name, expected 'Name Surname'" }
    ),
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
