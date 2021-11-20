import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { District } from "../../model/entity";

export const districts = async (
  req: Request<{ cityId: number }, any, any, any>,
  res: Response
) => {
  try {
    console.log(req.params);
    const cityId = req.params.cityId;
    if (!cityId)
      return res.status(400).json({ message: "cityId must be required " });

    const data = await getRepository(District)
      .createQueryBuilder()
      .where("city_id = :cityId")
      .setParameters({ cityId })
      .getMany();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json();
  }
};
