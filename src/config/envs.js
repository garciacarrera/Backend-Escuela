import joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    // DB_PASSWORD: joi.string().required(),
    DATABASE: joi.string().required(),
  })
  .unknown(true);

const { value: envsVar, error } = envsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const envs = {
  PORT: envsVar.PORT,
  DB_PORT: envsVar.DB_PORT,
  DB_HOST: envsVar.DB_HOST,
  DB_USER: envsVar.DB_USER,
  DATABASE: envsVar.DATABASE,
};
