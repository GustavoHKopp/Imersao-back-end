import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../confg/dbConfig.js'

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function conectarColecaoPosts() {
    const db = conexao.db('imersao-instabytes');
    const posts = db.collection('posts');

    return posts
}

export async function getTodosPost() {
    const colecao = await conectarColecaoPosts()

    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const colecao = await conectarColecaoPosts();

    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const colecao = await conectarColecaoPosts();

    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: post});
}