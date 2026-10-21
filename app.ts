import Fastify from 'fastify'
import envConfig from '@/config/env';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import appRoutes from '@/routes/routes';

const app = Fastify({
  logger: true
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(appRoutes);

app.listen({ port: envConfig.port }, (err, address) => {
  console.log(`Server is running on: ${address}`);
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

export default app;