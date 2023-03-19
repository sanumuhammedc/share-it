import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";

const __dirname = path.resolve();


import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


/**
 * function to upload file in /upload route
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },  
});

const upload = multer({storage : storage});

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
    }
});

// file upload end


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);


mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT, () => console.log(`server running on port ${PORT}`)) )
    .catch((error)=> console.log(error.message) );