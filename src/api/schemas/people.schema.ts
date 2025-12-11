import { z } from "zod";

export const peopleSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.string().url(),
  films: z.array(z.string().url()),
  species: z.array(z.string().url()),
  vehicles: z.array(z.string().url()),
  starships: z.array(z.string().url()),
  created: z.string(),
  edited: z.string(),
  url: z.string().url(),
});

export type People = z.infer<typeof peopleSchema>;
