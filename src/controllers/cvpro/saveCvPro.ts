import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { DbErrorCode } from "../../helpers/helpers";
import { CvProfessionalDto } from "../../model/dto/cv.dto";
import { CvProfessional } from "../../model/entity/CvProfessional";
import { cvProValidation } from "../../validation";


export const saveCvPro = async(
    req: Request<any, any, CvProfessionalDto, any>,
    res: Response
) => {
    try{
        const userId = (req as any)?.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });
        const data = req.body;

        const { error } = cvProValidation.validate(data);
        if (error) return res.status(400).json({ message: error.message });


        const result = await createQueryBuilder()
            .insert()
            .into(CvProfessional)
            .values({ 
                author_id: userId,
                codestyle: JSON.stringify(data.codestyle),
                image: data.image,
                create_date: new Date(),
                update_date: new Date(),
            })
            .returning("*")
            .execute();

            const [insertCvPro] = result.raw;
         
            return res.status(201).json({ 
                status:201, 
                message: "create cv pro successfully!", 
                cvpro_ref_id: insertCvPro.id
            });

    }catch(error: any){
        console.log(error);
        if (error.code == DbErrorCode.DUPLICATE)
        return res.status(400).json({ status: 400, message: "duplicate" });
        if (error.code == DbErrorCode.RELATION)
        return res.status(400).json({ status: 400, message: error.detail });
        res.status(400).json({ status: 400, message: error.message });
    }

}
