import devBundle from "./devBundle";
import express from "express";
import path from "path";
import template from "../template";
import { MongoClient } from "mongodb";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

const url =
  process.env.MONGODB_URI || "mongodb+srv://promise:<password>@<your_db>.gels5ab.mongodb.net/test";
let port = process.env.PORT || 3000;

MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
devBundle.compile(app);

app.get("/", (req, res) => {
  res.status(200).send(template());
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port " + port);
});
