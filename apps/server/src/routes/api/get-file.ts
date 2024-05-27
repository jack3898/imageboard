import { abstractStorageDriver } from "@/storage-driver.js";
import { z } from "zod";
import { webReadableToNodeReadable } from "@internal/storage";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";
import { imagesModel, validation } from "@internal/database";

export default (router: Router): void => {
  router.get("/file/:id/:quality", auth(), async (req, res, next) => {
    try {
      const id = z.string().parse(req.params["id"]);

      const qualitySpecifier = await validation.imageVariantValidationSchema.shape.quality
        .safeParseAsync(req.params["quality"])
        .then((value) => value.data)
        .catch(() => null);

      if (!qualitySpecifier) {
        return res.status(400).send("Invalid quality specifier");
      }

      const file = await imagesModel.findById(id).catch(console.error);
      const variant = file?.imageVariants.find((variant) => variant.quality === qualitySpecifier);

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
