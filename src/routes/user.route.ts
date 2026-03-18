import express from 'express';
import { UserController } from '../controllers/users.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate,  Segments } from 'celebrate';
import { userSchema } from '../schemas/users.schema.js';

export const userRoutes = express.Router();

userRoutes.get('/users', asyncHandler(UserController.getAll));
userRoutes.get('/users/:id', asyncHandler(UserController.getById));
userRoutes.put('/users/:id',celebrate({[Segments.BODY]: userSchema,}), asyncHandler(UserController.update));
userRoutes.delete('/users/:id', UserController.delete);
userRoutes.post('/users', celebrate({[Segments.BODY]: userSchema,}), UserController.save);
