import { Application, Router } from "express";
import { authController } from "../controllers/auth";
import { ConfigController } from "../controllers/config";
import {  cvController } from "../controllers/cv";
import { locationControler } from "../controllers/location";
import { translationController } from "../controllers/translation";
import { globalPrefix } from "../helpers/constants";
import { upload } from "../app";
import { suggestController } from "../controllers/suggest";
import {  CvProController } from "../controllers/cvpro";

const router = Router();

const initialRouter = (app: Application) => {
  router.get("/", (req, res) => {
    res.sendStatus(200);
  });

  router.get("/location/city", locationControler.cities);
  router.get("/location/city/:cityId/district", locationControler.districts);

  router.get("/config", ConfigController.config);

  router.get("/translation", translationController.translation);
  router.post("/translation", translationController.addTranslation);
  router.put("/translation", translationController.updateTranslation);

  //cv pro
  router.get('/cv/pro/list',CvProController.listCv);
  router.get('/cv/pro/detail/:id', CvProController.detailCv);
  router.get("/mypro-cv", CvProController.myProCv);
  router.post("/cv/pro", CvProController.saveCvPro);
  router.put("/cv/pro/:id", CvProController.updateCvPro);
  router.delete("/cv/pro/:id", CvProController.deleteCvPro);

  router.get("/my-cv", cvController.myCv);
  router.get("/cv", cvController.getCv);
  router.post("/cv", cvController.addCv);
  router.put("/cv", cvController.updateCv);
  router.post("/send-cv", upload.single("cv"), cvController.sendCv);

  router.get("/suggest", suggestController.getSuggest);
  router.post("/suggest", suggestController.addSuggest);
  router.put('/suggest', suggestController.updateSuggest);
  router.delete('/suggest/:category', suggestController.deleteSuggest)

  router.post("/login", authController.login);

  return app.use(`/${globalPrefix}`, router);
};

export default initialRouter;
