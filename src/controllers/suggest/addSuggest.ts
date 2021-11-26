import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Suggest } from "../../model/entity";

export const addSuggest = async (
  req: Request<any, any, { category: string; content: string[] }, any>,
  res: Response
) => {
  try {
    const { category, content } = req.body;

    if (!category || !content)
      return res
        .status(400)
        .json({ message: "category and content must be require" });

    const data = content.join("|");
    console.log(category, content);

    console.log(data);

    await getRepository(Suggest)
      .createQueryBuilder()
      .insert()
      .into(Suggest)
      .values({
        type: category.toLowerCase(),
        content: data,
      })
      .execute();

    return res.status(201).json({ status: 201, message: "create success" });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ status: 400, message: error.message });
  }
};
