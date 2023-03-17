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
    
}