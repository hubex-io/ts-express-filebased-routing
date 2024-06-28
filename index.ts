import express from "express";
import bodyParser from "body-parser";
import { router } from "express-file-routing";

// initialize express with filebased routing
async function main() {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.static("public"));

  app.use("/api/", await router());

  const port: String = process.env.PORT || "3000";
  app.listen(port, () => {
    console.log(`🖥️  Server is running at port ${port}`);
  });
}
main();
