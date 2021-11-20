import { getEnv } from "./helpers";

export const PORT = getEnv("PORT") || 3000;
export const DB_PG_HOST = getEnv("DB_PG_HOST");
export const DB_PG_PORT = getEnv("DB_PG_PORT");
export const DB_PG_USERNAME = getEnv("DB_PG_USERNAME");
export const DB_PG_PASSWORD = getEnv("DB_PG_PASSWORD");
export const DB_PG_NAME = getEnv("DB_PG_NAME");
export const globalPrefix = `api/v1`;
export const USER_SECRET = "exam";
export const SENDGRID_KEY = getEnv("SENDGRID_KEY");
