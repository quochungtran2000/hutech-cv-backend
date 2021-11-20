import dotEnv from "dotenv";
import { createQueryBuilder, getRepository } from "typeorm";
import { Configuration } from "../model/entity";
dotEnv.config();

export const getEnv = (key: string): string => {
  return process.env[key] || "";
};

export enum DbErrorCode {
  DUPLICATE = 23505,
  RELATION = 23503
}

export const getConfig = async (id: number): Promise<Configuration> => {
  const result = await getRepository(Configuration)
    .createQueryBuilder()
    .where("id = :id")
    .setParameters({ id })
    .getOne();

  if (!result) return Promise.reject({message:`config id [${id}] not found`});

  return Promise.resolve(result);
};
