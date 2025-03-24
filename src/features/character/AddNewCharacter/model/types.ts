import { z } from "zod";
import { addCharacterSchema } from "../../model";

export type IAddCharacterSchema = z.infer<typeof addCharacterSchema>;
