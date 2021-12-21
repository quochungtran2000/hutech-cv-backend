
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CvProfessional } from "../../model/entity/CvProfessional";

export const myProCv = async (req: Request, res: Response) => {
    try{
        const userId = (req as any)?.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });

        
        const mycv = await getRepository(CvProfessional)
            .createQueryBuilder()
            .where("author_id =:userId")
            .setParameters({ userId})
            .orderBy("create_date","DESC")
            .getMany();

        res.status(200).json({
            status: 200, 
            mycv: mycv
        })
        

    }catch(error: any) {
        console.error(error);
        res.status(400).json({ status: 400, message: error.message });
    }
}