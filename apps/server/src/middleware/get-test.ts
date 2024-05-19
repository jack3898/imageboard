import { env } from "@/env.js";
import { expressServer } from "@/server.js";
import { NodeLocalDriver, webReadableToNodeReadable } from "@internal/storage";

expressServer.get("/test", async (_, res) => {
  if (env.STORAGE_DRIVER === "node_local") {
    const driver = new NodeLocalDriver(env.STORAGE_BASE_PATH);
    const file = await driver.download("hello.png").catch((error) => {
      console.log(error);

      return null;
    });

    if (!file) {
      res.send("No image named hello.png found.").status(404);

      return;
    }

    res.setHeader("Content-Type", "image/png");

    webReadableToNodeReadable(file).pipe(res);

    return;
  }

  if (env.STORAGE_DRIVER === "s3") {
    res.send("This test endpoint does not yet work with S3.").status(400);

    return;
  }

  res.sendStatus(500);
});
