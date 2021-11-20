import { Request, Response } from "express";
import { getRepository, InsertResult, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { generatorToken } from "../../helpers/helpers";
import { LoginDto } from "../../model/dto/cv.dto";
import { Account } from "../../model/entity";

export const login = async (
  req: Request<any, any, LoginDto, any>,
  res: Response
) => {
  try {
    const dataLogin = req.body;

    const user = await getRepository(Account)
      .createQueryBuilder()
      .where("id = :userId")
      .setParameters({ userId: dataLogin.id })
      .getOne();

    if (!user) {
      const { raw }: InsertResult = await getRepository(Account)
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values({
          id: dataLogin.id,
          email: dataLogin.email,
          avatar: dataLogin.avatar,
          name: dataLogin.name,
        })
        .returning("*")
        .execute();

      const [insertUser] = raw;

      return res.status(200).json({
        token: await generatorToken(insertUser),
        user: insertUser,
        status: "insert",
      });
    }

    const values: QueryDeepPartialEntity<Account> = {};
    if (user.email !== dataLogin.email) values.email = dataLogin.email;
    if (user.avatar !== dataLogin.avatar) values.avatar = dataLogin.avatar;
    if (user.name !== dataLogin.name) values.name = dataLogin.name;

    if (Object.keys(values).length) {
      const { raw }: UpdateResult = await getRepository(Account)
        .createQueryBuilder()
        .update(Account)
        .set(values)
        .where("id = :userId")
        .setParameters({ userId: user.id })
        .returning("*")
        .execute();

      const [updateUser] = raw;

      return res.status(200).json({
        token: await generatorToken(updateUser),
        user: updateUser,
        status: "update",
      });
    }

    return res
      .status(200)
      .json({ token: await generatorToken(user), user: user, status: "not" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
