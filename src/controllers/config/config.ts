import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Configuration } from "../../model/entity";
import { getConfigValidation } from "../../validation";

export const config = async (
  req: Request<any, any, any, { type: string }>,
  res: Response
) => {
  try {
    const { error } = getConfigValidation.validate(req.query);
    if (error) return res.status(400).json({ message: error.message });

    const type = req.query.type;

    const data = await getRepository(Configuration)
      .createQueryBuilder()
      .where("name = :type")
      .setParameters({ type })
      .getMany();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
