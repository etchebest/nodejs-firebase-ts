import express from 'express';
import { userRoutes } from './user.route.js';
import { authRotes } from './auth.route.js';
import { companiesRoutes } from './companies.route.js';
import { catgegoryRoutes } from './category.route.js';

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: '5mb' }));
    app.use(authRotes);
    app.use(userRoutes);
    app.use(companiesRoutes);
    app.use(catgegoryRoutes);
};
