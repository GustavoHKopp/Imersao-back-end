import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { getPosts, publicNewPost, uploadImage, updateNewPost } from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200,
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req,  file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({
    dest: './uploads',
    storage
})

export default function routes(app) {
    app.use(express.json());
    app.use(cors(corsOptions))

    app.get('/posts', getPosts);
    app.post('/posts', publicNewPost);
    app.post('/upload', upload.single('imagem'), uploadImage);
    app.put('/upload/:id', updateNewPost);
};
