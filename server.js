import express from "express";

const app = express();
app.listen(3000, () => {
    console.log('Servidor está rodando...');
});

app.get('/', (req, res) => {
    res.status(200).send('Teste ABC');
});
