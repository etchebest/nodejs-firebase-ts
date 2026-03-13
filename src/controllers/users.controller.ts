import { Request, Response } from 'express';
import { User } from '../types/user.type.js';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';

export class UserController {
    static async getAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        return res.send(users);
    }

    static async getById(req: Request, res: Response) {
        const userId = String(req.params.id);
        const doc = await getFirestore().collection('users').doc(userId).get();
        const user = {
            id: doc.id,
            ...doc.data(),
        };

        return res.send(user);
    }

    static async update(req: Request, res: Response) {
        let userId = String(req.params.id);
        let user = req.body as User;

        const snapshot = await getFirestore()
            .collection('users')
            .doc(userId)
            .set({
                nome: user.nome,
                email: user.email,
                idade: user.idade,
            });

        return res.send({
            message: `Usuário ${userId} foi alterado com sucesso!`,
        });
    }

    static async delete(req: Request, res: Response) {
        let userId = String(req.params.id);

        await getFirestore().collection('users').doc(userId).delete();
        return res.send('Usuário excluido com sucesso');
    }

    static async save(req: Request, res: Response) {
        let user = req.body;

        const userSave = await getFirestore()
            .collection('users')
            .add({ ...user });

        return res.send({
            message: `Usuário ${userSave.id} criado com sucesso!`,
        });
    }
}
