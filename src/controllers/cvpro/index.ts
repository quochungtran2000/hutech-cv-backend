import { deleteCvPro } from "./deleteCvPro";
import { detailCv } from "./detailCv";
import { listCv } from "./listCv";
import { myProCv } from "./myProCv";
import { saveCvPro } from "./saveCvPro";
import { updateCvPro } from "./updateCvPro";


export const CvProController = {
    listCv: listCv,
    detailCv: detailCv,
    saveCvPro : saveCvPro,
    updateCvPro : updateCvPro,
    myProCv : myProCv,
    deleteCvPro : deleteCvPro,
}