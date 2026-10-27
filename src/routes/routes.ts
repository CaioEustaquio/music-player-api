import { FastifyInstance } from "fastify";
import songRoutes from "@/routes/songRoutes";
const appRoutes = async (app: FastifyInstance) => {
  app.get('/', async (req, reply) => {
    return reply.status(404).send({ message: 'Not found' });
  });

  await app.register(songRoutes, { prefix: '/songs' });
}

export default appRoutes;