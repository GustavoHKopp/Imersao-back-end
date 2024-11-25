import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postModel.js"
import path from 'path';
import { foundExt } from "../utils/funcoes.js";
import { fileURLToPath } from "url";
import generateDescriptionWithGemini from "../services/geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function publicNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    }
    try {
        const createdPost = await createPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}${path.extname(req.file.originalname)}`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const uploadsDir = path.join(__dirname, '../../uploads');
    try {
        const imgExt = await foundExt(uploadsDir, id);
        const imgBuffer = fs.readFileSync(`uploads/${id}${imgExt}`);
        const description = await generateDescriptionWithGemini(imgBuffer)
        const urlImg = `http://localhost:3000/${id}${imgExt}`;

        const post = {
            descricao: description,
            imgUrl: urlImg,
            alt: req.body.alt,
        };
        const updatedPost = await updatePost(id, post);
        res.status(200).json(updatedPost)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}