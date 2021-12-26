import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { CvProfessional } from "../../model/entity/CvProfessional";


export const detailCv = async (req: Request, res: Response) =>{
    try{ 
        const id = req.params.id;
        const cv = await getRepository(CvProfessional)
            .createQueryBuilder("cv")
            .leftJoinAndSelect("cv.author", "au")
            .where("cv.id =:id")
            .andWhere("cv.public = true")
            .setParameters({id: id})
            .getOne();
        var newView;
        if(cv)  newView = cv.view +=1;

        await createQueryBuilder()
            .update(CvProfessional)
            .set({
                view: newView
            })
            .where("id =id")
            .setParameters({id: id})
            .execute();
        res.status(200).json(cv);
    }catch(error: any){
        console.log(error);
        res.status(400).json({ status: 400, message: error.message });
    }
}