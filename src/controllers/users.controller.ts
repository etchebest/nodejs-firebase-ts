import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { UserService } from '../services/user.service.js';

export class UserController {
    /**
     * Recebe todos os usuários
     * @param req - Requisição
     * @param res - Resposta
     */
    static async getAll(req: Request, res: Response) {
        console.log(`getAll - UserId = ${req.user.id}`);

        res.status(200).send(await new UserService().getAll());
    }

    /**
     * Recebe um usuário pelo id
     * @param req - Requisição
     * @param res - Resposta
     */
    static async getById(req: Request, res: Response) {
        const userId = String(req.params.id);

        res.status(200).send(await new UserService().getById(userId));
    }

    /**
     * Atualiza um usuário pelo id
     * @param req - Requisição
     * @param res - Resposta
     */
    static async update(req: Request, res: Response) {
        const userId = String(req.params.id);
        const user = req.body;

        res.status(200).send(await new UserService().update(userId, user));
    }

    /**
     * Deleta um usuário pelo id
     * @param req - Requisição
     * @param res - Resposta
     */
    static async delete(req: Request, res: Response) {
        const userId = String(req.params.id);
        await new UserService().delete(userId);

        res.status(204).end();
    }

    /**
     * Salva um usuário
     * @param req - Requisição
     * @param res - Resposta
     */
    static async save(req: Request, res: Response) {
        const user: User = req.body;
        await new UserService().save(user);

        res.status(201).send('usuário criado com sucesso!');
    }
}
