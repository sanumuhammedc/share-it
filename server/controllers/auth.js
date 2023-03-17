import userModel from "../models/user.js";
import bcrypt from "bcrypt";

//sign up function
export const register = async (req, res) => {

    /* generating hashed password */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    const user = {...req.body, password: hashedPassword};
    
    const newUser = new userModel(user);

    try {
        await newUser.save() 

        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

//login function

export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if(!user) {
            res.status(404).json("user not found");
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            res.status(400).json("wrong password");
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}