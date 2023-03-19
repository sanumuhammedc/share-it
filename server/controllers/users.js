import userSchema from '../models/user.js';


export const updateUser = async (req, res) => { 

    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){

            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt); 
            } catch (error) {
                return res.status(500).json(error);
            }

        }

        try {
            const user = await userSchema.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {

        return res.status(403).json("You can update only your account");

    }
}

export const deleteUser = async (req, res) => { 

    if(req.body.userId === req.params.id || req.body.isAdmin){

        try {

            const user = await userSchema.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");

        } catch (error) {

            return res.status(500).json(error);

        }

    } else {

        return res.status(403).json("You can delete only your account");

    }

}

export const getUser = async (req, res) => {
    
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId ? await userSchema.findById(userId) : await userSchema.findOne({username: username});
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other); 
    } catch (error) {
        res.status(500).json(error);  
    }

}

export const followUser = async (req, res) => {

    if(req.body.userId !== req.params.id) {

        try {
            const user = await userSchema.findById(req.params.id);
            const currentUser = await userSchema.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {following: req.params.id}});
                res.status(200).json("User has been followed");
            } else{
                res.status(403).json("You already follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }

    } else{

        res.status(403).json("You can't follow yourself");

    } 

}

export const unFollowUser = async (req, res) => {

    if(req.body.userId !== req.params.id) {

        try {
            const user = await userSchema.findById(req.params.id);
            const currentUser = await userSchema.findById(req.body.userId);

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {following: req.params.id}});
                res.status(200).json("User has been unfollowed");
            } else{
                res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            res.status(500).json(error);
        }

    } else{

        res.status(403).json("You can't unfollow yourself");

    } 

}

export const getFollowing = async (req, res) => {

    try {

        const user = await userSchema.findById(req.params.userId);
        const following = await Promise.all(
            user.following.map((friendId) => {
                return userSchema.findById(friendId)
            })
        );
        let followingList = [];
        following.map((friend) => {
            const { _id, username, profilePicture } = friend;
            followingList.push({ _id, username, profilePicture });
        });
        res.status(200).json(followingList);

    } catch (error) {
        res.status(500).json(error);   
    }
}

export const getAllUsers = async (req, res) => {
    //fetch all users from database
    try {
        const users = await userSchema.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
};