import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GetAllSongsQuerySchema } from "@/dtos/GetAllSongsQueryDto";
import { GetAllSongsController } from "@/controllers/GetAllSongsController";
import { SongService } from "@/services/SongService";

const songService = new SongService();
const getAllSongsController = new GetAllSongsController(songService);
const songRoutes = async (app: FastifyInstance) => {
  app.get("/", {
    schema: { querystring: GetAllSongsQuerySchema }
  },
    getAllSongsController.getAll.bind(getAllSongsController)
  )
}
export default songRoutes;