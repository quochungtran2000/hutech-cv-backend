
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CvProfessional } from "../../model/entity/CvProfessional";

export const deleteCvPro = async(req: Request, res: Response) => {
    try {
        
        const userId = (req as any)?.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });

        const id = req.params.id;
        
        await getRepository(CvProfessional)
            .createQueryBuilder()
            .delete()
            .where("id =:id",{id: id})
            .andWhere("author_id =:userId",{userId: userId})
            .execute();
        res.status(200).json({
            status: 200,
            message: "delete successfully"
        })
    }catch (error: any) {
        console.error(error);
        res.status(400).json({ status: 400, message: error.message });
    }
}