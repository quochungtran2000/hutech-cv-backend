import "reflect-metadata";
import { globalPrefix, PORT } from "./helpers/constants";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import initialRouter from "./router";
import dbConfig from "./helpers/dbConfig";
import { createConnection } from "typeorm";
import multer from "multer";

// import auth from "./middleware/auth.middleware";
import morgan from "morgan";
import { auth } from "./middlewares/auth.middleware";

const app = Express();

app.use(auth);
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const upload = multer({ storage: undefined });

initialRouter(app);

createConnection(dbConfig).then(() => {
  app.listen(PORT, () =>
    console.log(`app listenning on http://localhost:${PORT}/${globalPrefix} `)
  );
});
