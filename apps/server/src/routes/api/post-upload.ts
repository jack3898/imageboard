import { filesModel } from "@/mongo.js";
import { abstractStorageDriver } from "@/storage-driver.js";
import { File } from "@internal/storage";
import multer from "multer";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";
import { RAW_VARIANT } from "@internal/database";
import { schemas } from "@internal/shared";

const upload = multer({ storage: multer.memoryStorage() });
const allowedMimeTypes = ["image/png", "image/jpeg"];

export default (router: Router): void => {
  router.post("/upload/image", auth(), upload.single("file"), async (req, res, next) => {
    try {
      const formData = schemas.upload.uploadForm.omit({ file: true }).parse(req.body);

      if (!req.file) {
        console.log("Uploaded file could not be found");
        return res.status(400).send("There was a problem processing your request");
      }

      if (!req.user?.userId) {
        console.log("User ID not found in auth context");
        return res.status(400).send("There was a problem processing your request");
      }

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        res.status(400).send(`Invalid MIME type. ${req.file.mimetype} is not permitted`);

        return;
      }

      if (!req.file.buffer) {
        console.error("No buffer could be found from the uploaded file");
        return res.status(400).send("There was a problem processing your request");
      }

      const file = new File({
        mimeType: req.file.mimetype,
        name: crypto.randomUUID() + req.file.mimetype.replace("/", "."), // Cheesy, but it does for now 🙈
        data: new Blob([req.file.buffer])
      });

      await abstractStorageDriver.upload(file);

      await filesModel.create({
        title: formData.title,
        variants: [
          {
            type: RAW_VARIANT,
            path: file.name,
            width: 500, // TODO: Calculate
            height: 500 // TODO: Calculate
          }
        ],
        tags: [],
        user: req.user.userId
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
};
