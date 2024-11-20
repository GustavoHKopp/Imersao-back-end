import { getTodosPost } from "../models/postModel.js"

export async function listarPosts(req, res) {
    const posts = await getTodosPost();    
    res.status(200).json(posts);
}
