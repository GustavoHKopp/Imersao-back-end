import 'dotenv/config';
import { ObjectId } from 'mongodb';
import createDBConnection from '../confg/dbConfig.js'

const conexao = await createDBConnection(process.env.STRING_CONEXAO);

async function connectCollection() {
    const db = conexao.db('imersao-instabytes');
    const posts = db.collection('posts');

    return posts
}

export async function getAllPosts() {
    const colecao = await connectCollection()

    return colecao.find().toArray();
}

export async function createPost(novoPost) {
    const colecao = await connectCollection();

    return colecao.insertOne(novoPost);
}

export async function updatePost(id, post) {
    const colecao = await connectCollection();

    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set: post});
}