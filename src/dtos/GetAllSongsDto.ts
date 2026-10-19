import z from "zod";

export const GetAllSongsSchema = z.object({
  query: z.string().optional(),
});
export type GetAllSongsDto = z.infer<typeof GetAllSongsSchema>;
