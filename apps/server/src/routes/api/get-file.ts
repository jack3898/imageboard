import { filesModel } from "@/mongo.js";
import { abstractStorageDriver } from "@/storage-driver.js";
import { z } from "zod";
import { webReadableToNodeReadable } from "@internal/storage";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";

export default (router: Router): void => {
  router.get("/file/:id", auth(), async (req, res, next) => {
    try {
      const id = z.string().parse(req.params["id"]);
      const file = await filesModel.findById(id).catch(console.error);

      if (!file) {
        res.status(404).send("File not found");

        return;
      }

      const download = await abstractStorageDriver.download(file.path);

      webReadableToNodeReadable(download).pipe(res);
    } catch (error) {
      next(error);
    }
  });
};
