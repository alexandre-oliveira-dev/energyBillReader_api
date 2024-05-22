import {Router} from "express";
import {FileProcessResolver} from "./file-process/file-process.resolver";
import multer from "multer";
import {FileResolver} from "./files/files.resolver";
import {UserResolver} from "./user/user.resolver";

export const route = Router();
const upload = multer();

//GET
route.get("/files/:userId", new FileResolver().getFiles);
route.get("/user/:userEmail", new UserResolver().getUser);

//POST
route.post(
  "/upload/:userId",
  upload.single("file"),
  new FileProcessResolver().fileProcess
);
route.post("/createUser", new UserResolver().createUser);

