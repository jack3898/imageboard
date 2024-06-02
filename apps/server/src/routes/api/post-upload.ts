import { abstractStorageDriver } from "@/storage-driver.js";
import { File, nodeReadableToWebReadable } from "@internal/storage";
import multer from "multer";
import { type Router } from "express";
import { auth } from "@/middleware/use-auth.js";
import { schemas } from "@internal/shared";
import { mimeToFiletype } from "@/utils/mime-to-filetype.js";
import { enforceMaxWidthAndHeight, getBasicImageMeta, stripExif } from "@/utils/process-image.js";
import { Readable } from "stream";
import { db } from "@/db.js";
import { FileVariantsTable, FilesTable, PostsTable } from "@internal/database";

const upload = multer({ storage: multer.memoryStorage() });
const allowedTypes = ["jpeg", "png"];

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

      const fileType = mimeToFiletype(req.file.mimetype);

      if (!fileType || !allowedTypes.includes(fileType)) {
        return res.status(400).send(`Invalid MIME type. ${req.file.mimetype} is not permitted`);
      }

      if (!req.file.buffer) {
        console.error("No buffer could be found from the uploaded file");
        return res.status(400).send("There was a problem processing your request");
      }

      const imageWithoutExif = stripExif(Readable.from(req.file.buffer));
      const { meta: metaBeforeResize, stream: streamBeforeResize } =
        await getBasicImageMeta(imageWithoutExif);
      const resizedImage = enforceMaxWidthAndHeight(streamBeforeResize, metaBeforeResize);
      const { meta, stream } = await getBasicImageMeta(resizedImage);

      const file = new File({
        mimeType: req.file.mimetype,
        name: `${crypto.randomUUID()}.${fileType}`,
        data: nodeReadableToWebReadable(stream)
      });

      await abstractStorageDriver.upload(file);

      const [dbPost] = await db
        .insert(PostsTable)
        .values({
          authorId: req.user.userId,
          description: formData.description,
          title: formData.title
        })
        .returning({ postId: PostsTable.id });

      const [dbFile] = await db
        .insert(FilesTable)
        .values({
          type: fileType,
          alt: formData.alt,
          postId: dbPost!.postId
        })
        .returning({ fileId: FilesTable.id });

      await db.insert(FileVariantsTable).values({
        fileId: dbFile!.fileId,
        height: meta.height ?? 0,
        width: meta.width ?? 0,
        path: file.name,
        quality: "RAW"
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  });
};
