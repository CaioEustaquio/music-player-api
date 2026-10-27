import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const errorHandlerMiddleware = async (app: FastifyInstance) => {
  app.setErrorHandler((
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    if (error.statusCode && error.statusCode < 500) {
      if (error.validation) {
        const firstError = error.validation[0];
        const field = firstError.instancePath ? firstError.instancePath.replace(/^\W/, '') : undefined;

        reply.status(400).send({
          error: "Data validation",
          message: firstError.message || "Invalid field",
          ...(field && { data_field: field })
        });
      }
    }
    app.log.error({ err: error })
    reply.status(500).send({
      error: 'Internal Server Error',
      message: 'Internal Server Error'
    });
  });
}

export default errorHandlerMiddleware;