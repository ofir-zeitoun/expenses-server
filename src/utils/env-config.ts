import dotenv from "dotenv";

dotenv.config();

type Env = {
  PORT: number;
  DBUri: string;
  ENV_MODE: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  AUTH0_CLIENT_SECRET: string;
};

function getEnv<Key extends keyof Env>(
  key: Key,
  defaultValue: Env[Key],
  parse: (value: string) => Env[Key] = String as unknown as (
    value: string
  ) => Env[Key]
): Env[Key] {
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return parse(value);
}

export const env = {
  port: getEnv("PORT", 1337, parseInt),
  envMode: getEnv("ENV_MODE", "production"),
  dbUri: getEnv("DBUri", "mongodb://127.0.0.1:27017"),
  auth0ClientId: getEnv("AUTH0_CLIENT_ID", ""),
  Auth0Domain: getEnv("AUTH0_DOMAIN", ""),
  Auth0Audience: getEnv("AUTH0_AUDIENCE", ""),
  Auth0ClientSecret: getEnv("AUTH0_CLIENT_SECRET", ""),
};
