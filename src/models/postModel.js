import conectarAoBanco from '../confg/dbConfig.js'

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function conectarColecaoPosts(){
    const db = conexao.db('imersao-instabytes');
    const posts = db.collection('posts');

    return posts
}

export async function getTodosPost(){
    const colecao = await conectarColecaoPosts()

    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    const colecao = await conectarColecaoPosts();

    return colecao.insertOne(novoPost);
}
    