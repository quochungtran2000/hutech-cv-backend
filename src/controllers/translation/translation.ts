import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Translation } from "../../model/entity";

export const translation = async (
  req: Request<any, any, any, { lang: string }>,
  res: Response
) => {
  try {
    const lang = req.query.lang;

    // if (key) qr.where("key = :key").setParameters({ key });
    const data = await getRepository(Translation)
      .createQueryBuilder()
      .getMany();

    const result:any = {};
    data.map((item) => {
      const key = item.key;
      const value = lang === "en" ? item.value_en : item.value_vi;
      result[key] = value;
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
