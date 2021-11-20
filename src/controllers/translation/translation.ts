import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Translation } from "../../model/entity";

export const translation = async (
  req: Request<any, any, any, { key: string }>,
  res: Response
) => {
  try {
    const key = req.query.key;

    const qr = getRepository(Translation).createQueryBuilder();

    if (key) qr.where("key = :key").setParameters({ key });

    const data = await qr.getMany();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
