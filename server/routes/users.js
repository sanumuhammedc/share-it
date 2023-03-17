import express from "express";
import { updateUser, deleteUser, getUser, followUser, unFollowUser } from "../controllers/users.js";

const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);

export default router;