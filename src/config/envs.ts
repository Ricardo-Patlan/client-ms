import 'dotenv/config';
import joi from 'joi';
 
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}
 
const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().integer().min(1).max(65535).required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);
 
const result = envsSchema.validate(process.env, { abortEarly: false });
if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}
 
const envVars = result.value as EnvVars;
 
export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
} as const;
