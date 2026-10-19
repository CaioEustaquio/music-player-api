import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllSongsSchema, GetAllSongsDto } from "@/dtos/GetAllSongsDto";

export class GetAllSongsController {
  constructor(private songService?: any) { }

  getAll = async (
    request: FastifyRequest<{ Querystring: GetAllSongsDto }>,
    reply: FastifyReply
  ) => {
    const data = request.query;
    return [
      {
        id: 1,
        title: "Billie Jean",
        author: "Michael Jackson",
        singer: "Michael Jackson",
        duration: "4:54",
        thumbnail: "https://amazonaws.com",
        file: "https://amazonaws.com"
      }
    ];
  }
}
