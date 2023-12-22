import express from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); //used for updating existing documents , id is dynamic
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost); //so that user can only like once for that specific id
export default router;
