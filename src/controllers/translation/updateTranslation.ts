import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Translation } from "../../model/entity";
import { addTranslationValidation } from "../../validation";

export const updateTranslation = async (
  req: Request<
    any,
    any,
    { key: string; value_vi: string; value_en: string },
    any
  >,
  res: Response
) => {
  try {
    const trans = req.body;
    const { error } = addTranslationValidation.validate(trans);
    if (error) return res.status(400).json({ message: error.message });

    const exitTrans = await getRepository(Translation)
      .createQueryBuilder()
      .where("key = :key")
      .setParameters({ key: trans.key })
      .getOne();

    if (!exitTrans)
      return res
        .status(400)
        .json({ status: 400, message: "Translation not found" });

    await getRepository(Translation)
      .createQueryBuilder()
      .update(Translation)
      .set({
        value_en: trans.value_en,
        value_vi: trans.value_vi,
      })
      .where("key = :key")
      .setParameters({ key: trans.key })
      .execute();

    return res.status(201).json({ status: 200, message: "update success" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
