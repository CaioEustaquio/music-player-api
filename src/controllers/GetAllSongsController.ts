import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllSongsQueryDto } from "@/dtos/GetAllSongsQueryDto";
import { SongService } from "@/services/SongService";

export class GetAllSongsController {
  constructor(private songService: SongService) { }

  async getAll(
    request: FastifyRequest<{ Querystring: GetAllSongsQueryDto }>,
    reply: FastifyReply
  ) {
    const {
      search,
      page,
      limit,
      orderBy,
      order,
    } = request.query;

    try {
      const songs = await this.songService.getAll(
        search,
        page,
        limit,
        orderBy,
        order
      );
      reply.send(songs).code(200);

    } catch (err: unknown) {
      console.error(err);
    }
  }
}