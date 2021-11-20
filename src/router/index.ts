import { Application, Router } from "express";
import { globalPrefix } from "../helpers/constants";

const router = Router();

const initialRouter = (app: Application) => {
  router.get("/", (req, res) => {
    res.sendStatus(200);
  });

  return app.use(`/${globalPrefix}`, router);
};

export default initialRouter;
