import { env } from "@/env.js";
import { expressServer } from "@/server.js";
import { NodeLocalDriver, webReadableToNodeReadable } from "@internal/storage";

expressServer.get("/test", async (_, res) => {
  if (env.STORAGE_DRIVER === "node_local") {
    const driver = new NodeLocalDriver(env.STORAGE_BASE_PATH);
    const file = await driver.download("hello.png").catch((error) => {
      console.error(error);

      return null;
    });

    if (!file) {
      res.status(404).send("No image named hello.png found.");

      return;
    }

    res.setHeader("Content-Type", "image/png");

    webReadableToNodeReadable(file).pipe(res);

    return;
  }

  if (env.STORAGE_DRIVER === "s3") {
    res.status(400).send("This test endpoint does not yet work with S3.");

    return;
  }

  res.sendStatus(500);
});
