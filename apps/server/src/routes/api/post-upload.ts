import { filesModel, usersModel } from "@/mongo.js";
import { abstractStorageDriver } from "@/storage-driver.js";
import { File } from "@internal/storage";
import multer from "multer";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";

const upload = multer({ storage: multer.memoryStorage() });
const allowedMimeTypes = ["image/png", "image/jpeg"];

export default (router: Router): void => {
  router.post("/upload/image", auth(), upload.single("file"), async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send("File not found");

        return;
      }

      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        res.status(400).send(`Invalid MIME type. ${req.file.mimetype} is not permitted`);

        return;
      }

      if (!req.file.buffer) {
        res.status(400).send("File not found");

        return;
      }

      const file = new File({
        mimeType: req.file.mimetype,
        name: crypto.randomUUID() + req.file.mimetype.replace("/", "."), // Cheesy, but it does for now 🙈
        data: new Blob([req.file.buffer])
      });

      await abstractStorageDriver.upload(file);

      await filesModel.create({
        path: file.name,
        user: (await usersModel.findOne())?.id // This is temporary
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
};
