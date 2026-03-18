import { NextFunction, Request, Response } from 'express';
import { User } from '../types/user.type.js';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';
import { ValidationError } from '../errors/validation-error.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).send(users);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = String(req.params.id);
        const doc = await getFirestore().collection('users').doc(userId).get();

        if (doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data(),
            });
        } else {
            throw new NotFoundError('Usuário não encontrado');
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = String(req.params.id);
        let user = req.body as User;

        const docRef = getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email,
                idade: user.idade,
            });

            res.status(200).send({
                message: `Usuário ${userId} foi alterado com sucesso!`,
            });
        } else {
            throw new NotFoundError('Usuário não encontrado.');
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = String(req.params.id);

        await getFirestore().collection('users').doc(userId).delete();
        res.status(204).end();
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user: User = req.body;

        if (!user.email || user.email?.length === 0 || !user.idade) {
            throw new ValidationError('E-mail e Idade são obrigatorios');
        }

        const userSave = await getFirestore()
            .collection('users')
            .add({ ...user });

        res.status(201).send({
            message: `Usuário ${userSave.id} criado com sucesso!`,
        });
    }
}
