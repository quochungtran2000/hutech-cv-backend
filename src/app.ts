import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import initialRouter from "./router";
import dbConfig from "./helpers/dbConfig";
import { createConnection } from "typeorm";
import { globalPrefix, PORT } from "./helpers/constants";
// import auth from "./middleware/auth.middleware";
import morgan from 'morgan'

const app = Express();

app.use(cors());
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initialRouter(app);

createConnection(dbConfig).then(() => {
  app.listen(PORT, () =>
    console.log(`app listenning on http://localhost:${PORT}/${globalPrefix} `)
  );
});
