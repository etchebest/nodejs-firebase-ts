import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { AuthController } from '../controllers/auth.controller.js';
import { celebrate, Segments } from 'celebrate';
import {
    userSchemaLogin,
    userSchemaRecovery,
} from '../schemas/users.schema.js';

export const authRotes = Router();

authRotes.post(
    '/auth/login',
    celebrate({ [Segments.BODY]: userSchemaLogin }),
    asyncHandler(AuthController.login),
);
authRotes.post(
    '/auth/recovery',
    celebrate({ [Segments.BODY]: userSchemaRecovery }),
    asyncHandler(AuthController.recovery),
);
