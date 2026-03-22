import express, { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.erro.js';

export const auth = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split('Bearer ')[1];

        console.log(!!token);

        if (token) {
            console.log(token);

            return next();
        }

        next(new UnauthorizedError());
    });
};
