import conectarAoBanco from '../confg/dbConfig.js'

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPost(){
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts')

    return colecao.find().toArray();
}
