import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { userSchemaPost, userSchemaUpdate } from '../schemas/users.schema.js';

export const userRoutes = Router();

userRoutes.get('/users', asyncHandler(UserController.getAll));
userRoutes.get('/users/:id', asyncHandler(UserController.getById));
userRoutes.put(
    '/users/:id',
    celebrate({ [Segments.BODY]: userSchemaUpdate }),
    asyncHandler(UserController.update),
);
userRoutes.delete('/users/:id', UserController.delete);
userRoutes.post(
    '/users',
    celebrate({ [Segments.BODY]: userSchemaPost }),
    UserController.save,
);
