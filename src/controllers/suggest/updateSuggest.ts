import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Suggest } from "../../model/entity";

export const updateSuggest = async (
  req: Request<any, any, { category: string; content: string[] }, any>,
  res: Response
) => {
  try {
    const { category, content } = req.body;
    const suggest = await getRepository(Suggest).find();
    const keys = [];
    for (const elm of suggest) {
      console.log(elm);
      keys.push(elm.type);
    }
    console.log(keys);
    console.log(keys.includes(category));
    if (!category || !keys.includes(category))
      return res.status(400).json({ message: `category must be [${keys}]` });
    if (!content)
      return res.status(400).json({ message: `content must be require` });

    const data = content.join("|");

    await getRepository(Suggest)
      .createQueryBuilder()
      .update(Suggest)
      .set({
        content: data,
      })
      .where("UPPER(type) = UPPER(:category)")
      .setParameters({ category })
      .execute();

    return res.status(201).json({ status: 201, message: "update success" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message });
  }
};
