import { Application, Router } from "express";
import { locationControler } from "../controllers/location";
import { globalPrefix } from "../helpers/constants";

const router = Router();

const initialRouter = (app: Application) => {
  router.get("/", (req, res) => {
    res.sendStatus(200);
  });

  router.get("/location/city", locationControler.cities);
  router.get("/location/city/:cityId/district", locationControler.districts);

  return app.use(`/${globalPrefix}`, router);
};

export default initialRouter;
