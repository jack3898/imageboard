import { filesModel } from "@/mongo.js";
import { apiRouter } from "@/server.js";
import { abstractStorageDriver } from "@/storage-driver.js";
import { z } from "zod";
import { webReadableToNodeReadable } from "@internal/storage";

apiRouter.get("/file/:id", async (req, res) => {
  const id = z.string().parse(req.params.id);
  const file = await filesModel.findById(id).catch(console.error);

  if (!file) {
    res.status(404).send("File not found");

    return;
  }

  const download = await abstractStorageDriver.download(file.path);

  webReadableToNodeReadable(download).pipe(res);
});
