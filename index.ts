import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { router } from "express-file-routing";

async function main() {
  const app = express();

  // middleware
  app.use(morgan("tiny"));
  app.use(bodyParser.json());
  app.use(express.static("public"));

  // initialize express with filebased routing
  app.use("/api/", await router());

  const port: String = process.env.PORT || "3000";
  app.listen(port, () => {
    console.log(`🖥️  Server is running at port ${port}`);
  });
}
main();
