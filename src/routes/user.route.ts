import express from 'express';
import { UserController } from '../controllers/users.controller.js';

export const userRoutes = express.Router();

userRoutes.get('/users', UserController.getAll);
userRoutes.get('/users/:id', UserController.getById);
userRoutes.put('/users/:id', UserController.update);
userRoutes.delete('/users/:id', UserController.delete);
userRoutes.post('/users', UserController.save);
