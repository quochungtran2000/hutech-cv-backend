
import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { CvProfessional } from "../../model/entity/CvProfessional";

export const deleteCvPro = async(req: Request, res: Response) => {
    try {
        
        const userId = (req as any)?.user?.userId || "1811061170";
        if (!userId) return res.status(401).json({ message: "Unauthorized!" });

        // const { idList } = req.body;
        // const deleteDriver = await createQueryBuilder()
        //     .softDelete()
        //     .from(CvProfessional)
        //     .where("id IN(:...ids)", { ids: idList })
        //     .execute();

        await createQueryBuilder()
            .update(CvProfessional)
            .set({ 
                public: false
            })
            .where('id =:id')
            .setParameters({id: +req.params.id})
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