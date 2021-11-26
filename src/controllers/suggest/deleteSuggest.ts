import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Suggest } from "../../model/entity";

export const deleteSuggest = async (
  req: Request<{ category: string }, any, any, any>,
  res: Response
) => {
  try {
    const { category } = req.params;
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
      .delete()
      .from(Suggest)
      .where("UPPER(type) = UPPER(:category)")
      .setParameters({ category })
      .execute();

   

    return res.status(201).json({ status: 202, message: "delete success" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message });
  }
};
