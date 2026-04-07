import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import 'dotenv/config';

import { registerValidator, loginValidator, postCreateValidation } from './validation.js';

import { PostController, UserController } from './controller/index.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Db Ok'))
    .catch((err) => console.log('Db Error:', err))


const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage })

app.use(express.json());
app.use('upload', express.static('uploads'));

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>
    res.json({
        url: `/uploads/${req.file.originalname}`,
    }))

app.get('/posts', checkAuth, PostController.getAll)
app.get('/posts/:id', checkAuth, PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)



app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK')
});

