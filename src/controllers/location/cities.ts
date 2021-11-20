import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { City } from "../../model/entity";

export const cities = async (req: Request, res: Response) => {
  try {
    const data = await getRepository(City).createQueryBuilder().getMany();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
