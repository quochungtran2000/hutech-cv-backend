import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { CvProfessional } from "../../model/entity/CvProfessional";

export const listCv = async (req:Request, res:Response) => {
    try{
        const data = await getRepository(CvProfessional)
            .createQueryBuilder('cv')
            .leftJoinAndSelect('cv.author', 'au')
            .getMany();

        res.status(200).json(data);

    }catch(error: any){
        console.error(error);
        return res.status(400).json({ status: 400, message: error.message });
    }
}