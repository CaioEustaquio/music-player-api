import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GetAllSongsSchema, GetAllSongsDto } from "@/dtos/GetAllSongsDto";
import { GetAllSongsController } from "@/controllers/GetAllSongsController";

const getAllSongsController = new GetAllSongsController();
const songRoutes = async (app: FastifyInstance) => {
  app.get("/", {
    schema: { querystring: GetAllSongsSchema }
  },
    getAllSongsController.getAll.bind(getAllSongsController)
  )
}
export default songRoutes;