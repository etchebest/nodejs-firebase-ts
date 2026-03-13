import express, { Request, Response } from 'express';
import { User } from '../types/user.type.js';

const userRoutes = express.Router();


let id = 1;
let usuarios: User[] = [];

userRoutes.get('/users', (req: Request, res: Response) => {
    return res.send(usuarios);
});

userRoutes.get('/users/:id', (req: Request, res: Response) => {
    let userId = +req.params.id;
    const user = usuarios.find((user) => user.id === userId);

    return res.send(user);
});

userRoutes.put('/users/:id', (req: Request, res: Response) => {
    let userId = +req.params.id;
    let user = req.body;
    let indexOf = usuarios.findIndex((_user: User) => _user.id === userId);

    usuarios[indexOf].nome = user.nome;
    usuarios[indexOf].email = user.email;
    usuarios[indexOf].idade = user.idade;

    return res.send({ message: `Usuário ${userId} foi alterado com sucesso!` });
});

userRoutes.delete('/users/:id', (req: Request, res: Response) => {
    let userId = +req.params.id;
    let indexOf = usuarios.findIndex((user: User) => user.id === userId);
    usuarios.splice(indexOf, 1);

    return res.send('Usuário excluido com sucesso');
});

userRoutes.post('/users', (req: Request, res: Response) => {
    let user = req.body;
    user.id = id++;
    console.log(user);
    usuarios.push(user);

    return res.send({ message: 'Usuário criado com sucesso!' });
});

export { userRoutes };
