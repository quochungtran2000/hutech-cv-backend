import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { CVPRODTO } from "../../model/dto/cv.dto";
import { Account } from "../../model/entity";
import { CvProfessional } from "../../model/entity/CvProfessional";
import { CvProTypeValidation } from "../../validation";
// import { cvProValidation } from "../../validation";

export const updateCvPro = async (
    req: Request<any, any, CVPRODTO, any>,
    res: Response
) =>{
    try{ 
        const userId = (req as any)?.user?.userId || "1811061170";
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });
        const id = req.params.id;
        const data = req.body;

        const { error: errors1 } = CvProTypeValidation.validate(req.body);
        if (errors1) return res.status(400).json({ message: errors1.message });

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
            .update(CvProfessional)
            .set(CVPRODTO.fromDTO(data))
            .where('id =:id',{id: id})
            .andWhere("author_id =:userId", {})
            .setParameters({userId})
            .execute();
            // .into(CvProfessional)
            // .values(CVPRODTO.fromDTO(data))
            // .execute();

          res.status(200).json({        
            status:200,
            message: "update successfully !",
        })
    }catch(error: any) {
        console.log(error);
        return res.status(400).json({ status: 400, message: error.message });
    }
}