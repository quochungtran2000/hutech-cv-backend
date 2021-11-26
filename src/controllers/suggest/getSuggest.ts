import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Suggest } from "../../model/entity";

export const getSuggest = async (
  req: Request<any, any, any, { category: string }>,
  res: Response
) => {
  try {
    const { category } = req.query;
    const suggest = await getRepository(Suggest).find();
    const keys = [];
    for (const elm of suggest) {
      console.log(elm);
      keys.push(elm.type);
    }
    console.log(keys);
    console.log(keys.includes(category));
    if (!category || !keys.includes(category)) {
      return res.status(400).json({ message: `category must be [${keys}]` });
    }

    const data = await getRepository(Suggest)
      .createQueryBuilder()
      .where("UPPER(type) = UPPER(:category)")
      .setParameters({ category })
      .getOne();

    const result = {
      category: data?.type,
      content: data?.content.split("|"),
    };

    return res.status(201).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message });
  }
};
