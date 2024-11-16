import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./database/db.js";
import bodyParser from "body-parser";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, async () => {
  await testConnection();
  console.log(`Running at ${port}`);
});
