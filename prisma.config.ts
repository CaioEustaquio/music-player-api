import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';
import envConfig from './src/config/env';

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    migrations: {
      dir: "./src/prisma/migrations/"
    },
    db: {
      connection: envConfig.dbUrl,
    },
  }),
});
