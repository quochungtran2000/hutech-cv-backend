import { ConnectionOptions } from "typeorm";
import {
  Account,
  Activity,
  Certificate,
  City,
  Configuration,
  Cv,
  District,
  Education,
  Experience,
  Language,
  Skill,
  Suggest,
} from "../model/entity";
import { Translation } from "../model/entity/Translation.entity";
import {
  DB_PG_HOST,
  DB_PG_NAME,
  DB_PG_PASSWORD,
  DB_PG_PORT,
  DB_PG_USERNAME,
} from "./constants";

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: DB_PG_HOST,
  port: Number(DB_PG_PORT) || 5432,
  username: DB_PG_USERNAME,
  password: DB_PG_PASSWORD,
  database: DB_PG_NAME,
  entities: [
    City,
    District,
    Language,
    Skill,
    Certificate,
    Education,
    Experience,
    Activity,
    Configuration,
    Cv,
    Translation,
    Account,
    Suggest
  ],
};

export default dbConfig;
