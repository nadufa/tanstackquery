import { z } from "zod";
import { editCharacterSchema } from "../../model";

export type IEditCharacterSchema = z.infer<typeof editCharacterSchema>;
