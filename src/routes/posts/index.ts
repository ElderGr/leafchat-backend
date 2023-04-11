import { Router } from "express";
import * as PostsController from "@controllers/Posts";
import * as multer from "multer";
import uploadConfig from "../../config/upload";

const router = Router()
const upload = multer(uploadConfig);

router.get(`/`, PostsController.listPosts)
router.post(`/`, upload.single(`midia`),  PostsController.createPost)

export default router
