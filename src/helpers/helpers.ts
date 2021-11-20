import dotEnv from "dotenv";
dotEnv.config();

export const getEnv = (key: string): string => {
  return process.env[key] || "";
};
