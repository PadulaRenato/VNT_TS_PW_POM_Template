import { z } from "zod";

export const planetSchema = z.object({
  name: z.string(),
  rotation_period: z.string(),
  orbital_period: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.string(),
  terrain: z.string(),
  surface_water: z.string(),
  population: z.string(),
  residents: z.array(z.string().url()),
  films: z.array(z.string().url()),
  created: z.string(),
  edited: z.string(),
  url: z.string().url(),
});

export type Planet = z.infer<typeof planetSchema>;
