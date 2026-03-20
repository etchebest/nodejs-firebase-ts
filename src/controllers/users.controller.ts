import { Request, Response } from 'express';
import { User } from '../types/user.type.js';
import { UserService } from '../services/user.service.js';

export class UserController {
    static async getAll(req: Request, res: Response) {
        res.status(200).send(await new UserService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const userId = String(req.params.id);
        
        res.status(200).send(await new UserService().getById(userId));
    }

    static async update(req: Request, res: Response) {
        const userId = String(req.params.id);
        const user = req.body;

        res.status(200).send(await new UserService().update(userId, user));
    }

    static async delete(req: Request, res: Response) {
        const userId = String(req.params.id);
        await new UserService().delete(userId);

        res.status(204).end();
    }

    static async save(req: Request, res: Response) {
        const user: User = req.body;
        await new UserService().save(user);

        res.status(201).send('usuário criado com sucesso!');
    }
}
