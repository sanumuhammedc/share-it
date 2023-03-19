import express from "express";
import { updateUser, deleteUser, getUser, followUser, unFollowUser, getFollowing } from "../controllers/users.js";

const router = express.Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router.get('/following/:userId', getFollowing);
// router.get("/all", getAllUsers)

export default router;