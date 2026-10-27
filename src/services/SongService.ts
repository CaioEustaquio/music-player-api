import { db } from "@/prisma/db";
import { Song } from "@/types/Song";

type SongOrderBy = "title" | "created_at";
type Order = "asc" | "desc";

export class SongService {
  async getAll(
    search?: string,
    page = 1,
    limit = 10,
    orderBy: SongOrderBy = "title",
    order: Order = "asc",
  ): Promise<Song[]> {
    const offset = (page - 1) * limit;

    const songs = await db.orm.public.Song
      .where((song) =>
        song.title.ilike(`%${search ?? ""}%`),
      )
      .select(
        "id",
        "title",
        "duration",
        "thumbnail_image_url",
        "file_url",
      )
      .include("authors", (songAuthor) =>
        songAuthor.include("author"),
      )
      .orderBy((song) =>
        orderBy === "title"
          ? order === "asc"
            ? song.title.asc()
            : song.title.desc()
          : order === "asc"
            ? song.created_at.asc()
            : song.created_at.desc(),
      )
      .limit(limit)
      .offset(offset)
      .all();

    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      duration: song.duration,
      imageUrl: song.thumbnail_image_url,
      fileUrl: song.file_url,
      authors: song.authors.map((sa) => ({
        id: sa.author.id,
        name: sa.author.name,
        imageUrl: sa.author.image_url,
        createdAt: sa.author.created_at,
        updatedAt: sa.author.updated_at,
      })),
    }));
  }
}