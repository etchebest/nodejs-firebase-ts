import express from 'express';
import { userRoutes } from './user.route.js';
import { authRotes } from './auth.route.js';

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRotes)
    app.use(userRoutes);
};
