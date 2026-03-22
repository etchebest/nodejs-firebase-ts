import express, { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.erro.js';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service.js';
import { Forbidden } from '../errors/forbidden.error copy.js';

export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        // Verifica se a rota é de login, se for, não verifica o token
        if (req.method === 'POST' && req.url.startsWith('/auth/login')) {
            return next();
        }

        if (req.method === 'POST' && req.url.startsWith('/auth/recovery')) {
            return next();
        }

        // Pega o token do header
        const token = req.headers.authorization?.split('Bearer ')[1];

        // Verifica se o token é válido
        if (token) {
            try {
                const decodeIdToken: DecodedIdToken =
                    await getAuth().verifyIdToken(token, true);

                const user = await new UserService().getById(decodeIdToken.uid);

                if (!user) {
                    return next(new Forbidden());
                }

                req.user = user;

                return next();
            } catch (error) {
                next(new UnauthorizedError());
            }
        }

        // Se não tiver token, lança erro
        next(new UnauthorizedError());
    });
};
