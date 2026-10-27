import postgres from '@prisma/orm-postgres/runtime';
import { contractFromJson } from '@prisma/orm-postgres/static';
import type { Contract } from '@/prisma/contract.d';
import contractJson from '@/prisma/contract.json' with { type: 'json' };
import envConfig from '@/config/env';

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
  contract,
  url: envConfig.dbUrl,
});
