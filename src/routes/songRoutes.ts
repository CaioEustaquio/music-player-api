import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GetAllSongsSchema } from "@/dtos/GetAllSongsDto";
import { GetAllSongsController } from "@/controllers/GetAllSongsController";

const getAllSongsController = new GetAllSongsController();

const songRoutes = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get(
    "/songs",
    {
      schema: { querystring: GetAllSongsSchema }
    },
    getAllSongsController.getAll
  );
}

export default songRoutes;
