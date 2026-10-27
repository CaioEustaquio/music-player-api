import z from "zod";

export const GetAllSongsQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  orderBy: z.enum(["title", "created_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
export type GetAllSongsQueryDto = z.infer<typeof GetAllSongsQuerySchema>;
