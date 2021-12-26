import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { DbErrorCode } from "../../helpers/helpers";
import { CVPRODTO, CvProfessionalDto } from "../../model/dto/cv.dto";
import { Account } from "../../model/entity/Account.entity";
import { CvProfessional } from "../../model/entity/CvProfessional";
import { CvProTypeValidation } from "../../validation";

export const saveCvPro = async (
  req: Request<any, any, CVPRODTO, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId || "1811061170";
    if (!userId) return res.status(401).json({ message: "Unauthorized!" });

    const { error: errors1 } = CvProTypeValidation.validate(req.body);
    if (errors1) return res.status(400).json({ message: errors1.message });

    const data = req.body;
    data.author_id = userId;
    const findUser = await getRepository(Account)
      .createQueryBuilder()
      .where('id =:userId')
      .setParameters({userId})
      .getOne();

      console.log(findUser);
    
    if(findUser){
      data.fullname = findUser.name;
      data.email = findUser.email;
    }

    await createQueryBuilder()
      .insert()
      .into(CvProfessional)
      .values(CVPRODTO.fromDTO(data))
      .execute();

    return res.status(201).json({
      status: 201,
      message: `create ${data.type === "template" ? "template" : "cv"} success`,
    });
  } catch (error: any) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
