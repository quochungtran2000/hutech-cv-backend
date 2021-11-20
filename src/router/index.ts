import { Application, Router } from "express";
import { ConfigController } from "../controllers/config";
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

  return app.use(`/${globalPrefix}`, router);
};

export default initialRouter;
