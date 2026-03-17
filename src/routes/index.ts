import express from 'express';
import { userRoutes } from './user.route.js';

export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(userRoutes);
};
