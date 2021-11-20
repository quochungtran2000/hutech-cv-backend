import { ConnectionOptions } from "typeorm";
import {
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
} from "../model/entity";
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
  ],
};

export default dbConfig;
