import { filesModel } from "@/mongo.js";
import { abstractStorageDriver } from "@/storage-driver.js";
import { z } from "zod";
import { webReadableToNodeReadable } from "@internal/storage";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";
import { RAW_VARIANT } from "@internal/database";

export default (router: Router): void => {
  router.get("/file/:id/:variant", auth(), async (req, res, next) => {
    try {
      const id = z.string().parse(req.params["id"]);

      const variantName = await z
        .enum([RAW_VARIANT])
        .safeParseAsync(req.params["variant"])
        .then((value) => value.data)
        .catch(() => null);

      if (!variantName) {
        return res.status(400).send("Invalid variant");
      }

      const file = await filesModel.findById(id).catch(console.error);

      const variant = file?.variants.find((variant) => variant.type === variantName);

      if (!variant) {
        res.status(404).send("File not found");

        return;
      }

      const download = await abstractStorageDriver.download(variant.path);

      webReadableToNodeReadable(download).pipe(res);
    } catch (error) {
      next(error);
    }
  });
};
