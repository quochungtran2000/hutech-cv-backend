import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { CvProfessionalDto } from "../../model/dto/cv.dto";
import { CvProfessional } from "../../model/entity/CvProfessional";
import { cvProValidation } from "../../validation";

export const updateCvPro = async (
    req: Request<any, any, CvProfessionalDto, any>,
    res: Response
) =>{
    try{ 
        const userId = (req as any)?.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });
        const id = req.params.id;
        const data = req.body;

        const { error } = cvProValidation.validate(data);
        if (error) return res.status(400).json({ message: error.message });

        
        const updateCv = await createQueryBuilder()
            .update(CvProfessional)
            .set({ 
                image: data.image,
                codestyle: JSON.stringify(data.codestyle),
                update_date: new Date()
            })
            .where("id =:id")
            .setParameters({id})
            .execute();

          res.status(200).json({        
            status:200,
            message: "update successfully !",
            data: updateCv
        })
    }catch(error: any) {
        console.log(error);
        return res.status(400).json({ status: 400, message: error.message });
    }
}