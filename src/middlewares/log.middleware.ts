import { Request, NextFunction, Response } from "express";

export const logger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query, params, path, body } = req;
  console.log(JSON.stringify({ path, query, params, body }));
  next();
};
