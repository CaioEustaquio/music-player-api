import Fastify from 'fastify'
import envConfig from '@/config/env';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import songRoutes from '@/routes/songRoutes';

const fastify = Fastify({
  logger: true
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.register(songRoutes);

fastify.listen({ port: envConfig.port }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})