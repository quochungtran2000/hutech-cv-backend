import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cv } from "../../model/entity";

export const getCv = async (req: Request, res: Response) => {
  try {
    const data = await getRepository(Cv)
      .createQueryBuilder('cv')
      .leftJoinAndSelect("cv.experiences", "ex")
      .leftJoinAndSelect("cv.educations", "ed")
      .leftJoinAndSelect("cv.certificates", "ce")
      .leftJoinAndSelect("cv.activities", "ac")
      .leftJoinAndSelect("cv.skills", "sk")
      .leftJoinAndSelect("cv.languages", "la")
      .leftJoinAndSelect("cv.city", "ct")
      .leftJoinAndSelect("cv.district", "di")
      .leftJoinAndSelect("cv.configurations", "co")
      .getMany();
    return res.status(200).json(data);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
