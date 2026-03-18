import express from 'express';
import { UserController } from '../controllers/users.controller.js';
import asyncHandler from 'express-async-handler';

export const userRoutes = express.Router();

userRoutes.get('/users', asyncHandler(UserController.getAll));
userRoutes.get('/users/:id', asyncHandler(UserController.getById));
userRoutes.put('/users/:id', asyncHandler(UserController.update));
userRoutes.delete('/users/:id', UserController.delete);
userRoutes.post('/users', UserController.save);
