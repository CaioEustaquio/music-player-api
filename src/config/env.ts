import envVar from 'env-var';

const envConfig = {
  port: envVar.get("PORT").required().asInt()
}

export = envConfig;