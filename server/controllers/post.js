import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {

    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }  

}

export const updatePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated!");
        }
        else {
            res.status(403).json("You can update only your post!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }

}

export const deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted!");
        }
        else {
            res.status(403).json("You can delete only your post!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
    
}

export const likePost = async (req, res) => {
    
        try {
            const post = await Post.findById(req.params.id);
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } });
                res.status(200).json("The post has been liked!");
            }
            else {
                await post.updateOne({ $pull: { likes: req.body.userId } });
                res.status(200).json("The post has been disliked!");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    
}

export const getPost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }

}

//get the post of a user and the posts of the users that the he/she follows
export const getTimelinePosts = async (req, res) => {

    try {

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserPosts = async (req, res) => {

    try {

        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json(error);

    }
}