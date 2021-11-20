import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Translation } from "../../model/entity";
import { addTranslationValidation } from "../../validation";

export const addTranslation = async (
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

    await getRepository(Translation)
      .createQueryBuilder()
      .insert()
      .into(Translation)
      .values({
        key: trans.key,
        value_vi: trans.value_vi,
        value_en: trans.value_en,
      })
      .execute();

    return res.status(201).json({ status: 201, message: "create success" });
  } catch (error) {
    return res.status(400).json();
  }
};
