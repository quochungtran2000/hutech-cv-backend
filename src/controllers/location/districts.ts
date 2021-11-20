import { Request, Response } from "express";

export const districts = async (req: Request, res: Response) => {
  try {
    return res.status(400).json([{id: 123, name: 'ASD'}]);
  } catch (error) {
    return res.status(400).json();
  }
};
