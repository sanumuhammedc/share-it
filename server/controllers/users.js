import userSchema from '../models/user.js';

export const getUsers = (req, res) => { 
    res.send("Hello from the users controller!");
}