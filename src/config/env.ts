import envVar from 'env-var';

const envConfig = {
  port: envVar.get("PORT").required().asInt(),
  dbUrl: envVar.get("DB_URL").required().asString()
}

export = envConfig;