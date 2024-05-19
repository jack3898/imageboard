import { env } from "@/env.js";
import { filesModel, usersModel } from "@/mongo.js";
import { apiRouter } from "@/server.js";
import { NodeLocalDriver, File } from "@internal/storage";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
const allowedMimeTypes = ["image/png", "image/jpeg"];

apiRouter.post("/upload/image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("No file attached");

    return;
  }

  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    res
      .status(400)
      .send(
        `Invalid mime type, expected any of: ${allowedMimeTypes.join(", ")}. Received ${req.file.mimetype}`,
      );

    return;
  }

  if (!req.file.buffer) {
    res.status(500).send("No buffer could be found on the uploaded file");

    return;
  }

  if (env.STORAGE_DRIVER === "node_local") {
    const driver = new NodeLocalDriver(env.STORAGE_BASE_PATH);

    const file = new File({
      mimeType: req.file.mimetype,
      name: crypto.randomUUID() + req.file.mimetype.replace("/", "."), // Cheesy, but it does for now 🙈
      data: new Blob([req.file.buffer]),
    });

    await driver.upload(file);

    await filesModel.create({
      path: file.name,
      user: (await usersModel.findOne())?.id, // This is temporary
    });

    res.sendStatus(200);

    return;
  }

  res.sendStatus(500);
});
