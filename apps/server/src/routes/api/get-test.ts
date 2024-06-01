import { db } from "@/db.js";
import { type Router } from "express";

export default (router: Router): void => {
  router.get("/test", async (_, res) => {
    const posts = await db.query.PostsTable.findMany();
    const files = await db.query.FilesTable.findMany();
    const fileVariants = await db.query.FileVariantsTable.findMany();
    const users = await db.query.UsersTable.findMany();
    res.send({ posts, files, fileVariants, users });
  });
};
