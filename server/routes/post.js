import express from "express";
import { createPost, updatePost, deletePost, likePost, getPost, getTimelinePosts, getUserPosts } from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", getTimelinePosts);
router.get("/profile/:username", getUserPosts);

export default router;