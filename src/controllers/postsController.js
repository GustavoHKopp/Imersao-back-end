import fs from "fs";
import { getTodosPost, criarPost, atualizarPost } from "../models/postModel.js"
import path from 'path';
import { fountExt } from "../utils/funcoes.js";
import { fileURLToPath } from "url";
import gerarDescricaoComGemini from "../services/geminiService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function listarPosts(req, res) {
    const posts = await getTodosPost();
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    }
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}${path.extname(req.file.originalname)}`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const uploadsDir = path.join(__dirname, '../../uploads');
    try {
        const imgExt = await fountExt(uploadsDir, id);
        const imgBuffer = fs.readFileSync(`uploads/${id}${imgExt}`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const urlImg = `http://localhost:3000/${id}${imgExt}`;

        const post = {
            descricao: descricao,
            imgUrl: urlImg,
            alt: req.body.alt,
        };
        const postAtualizado = await atualizarPost(id, post);
        res.status(200).json(postAtualizado)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            "Erro": "Falha na requisição!"
        })
    }
}