import { Application, Router } from "express";
import { authController } from "../controllers/auth";
import { ConfigController } from "../controllers/config";
import { cvController } from "../controllers/cv";
import { locationControler } from "../controllers/location";
import { translationController } from "../controllers/translation";
import { globalPrefix } from "../helpers/constants";

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

  router.get("/my-cv", cvController.myCv);
  router.get("/cv", cvController.getCv);
  router.post("/cv", cvController.addCv);
  router.put("/cv", cvController.updateCv);

  router.post("/login", authController.login);

  return app.use(`/${globalPrefix}`, router);
};

export default initialRouter;
