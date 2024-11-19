import express from "express";

const posts = [
    {
        id: 1,
        descricao: 'Uma foto',
        imagem: 'https://placecats.com/millie/300/150',
    },
    {
        id: 2,
        descricao: 'Um gatinho curioso',
        imagem: 'https://placecats.com/200/300',
    },
    {
        id: 3,
        descricao: 'Gato dormindo',
        imagem: 'https://placecats.com/millie/300/150',
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor está rodando...');
});

function buscaPostPorId(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}

app.get('/posts', (req, res) => {
    res.status(200).json(posts)
});

app.get('/posts/:id', (req, res) => {
    const index = buscaPostPorId(req.params.id)
    res.status(200).json(posts[index])
});
