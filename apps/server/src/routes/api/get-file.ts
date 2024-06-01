import { abstractStorageDriver } from "@/storage-driver.js";
import { z } from "zod";
import { webReadableToNodeReadable } from "@internal/storage";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";
import { db } from "@/db.js";
import { FileVariantsTable } from "@internal/database";
import { and, eq } from "drizzle-orm";

export default (router: Router): void => {
  router.get("/file/:id/:quality", auth(), async (req, res, next) => {
    try {
      const id = z.string().parse(req.params["id"]);

      const qualitySpecifier = await z
        .enum(["RAW", "OPTIMIZED", "THUMBNAIL"])
        .safeParseAsync(req.params["quality"]?.toUpperCase())
        .then((value) => value.data)
        .catch(() => null);

      if (!qualitySpecifier) {
        return res.status(400).send("Invalid quality specifier");
      }

      const file = await db.query.FileVariantsTable.findFirst({
        where: and(eq(FileVariantsTable.id, id), eq(FileVariantsTable.quality, qualitySpecifier))
      });

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
