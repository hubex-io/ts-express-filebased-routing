import express from "express";
import { router } from "express-file-routing";

// initialize express with filebased routing
async function main() {
  const app = express();
  app.use("/", await router());
  const port: String = process.env.PORT || "3000";
  app.listen(port, () => {
    console.log(`🖥️  Server is running at http://localhost:${port}`);
  });
}
main();
