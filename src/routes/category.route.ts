import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import {
    categorySchema,
    updateCategorySchema,
} from '../schemas/category.schema.js';

export const catgegoryRoutes = Router();

catgegoryRoutes.get('/categories', asyncHandler(CategoriesController.getAll));
catgegoryRoutes.get(
    '/categories/:id',
    asyncHandler(CategoriesController.getById),
);

catgegoryRoutes.post(
    '/categories',
    celebrate({ [Segments.BODY]: categorySchema }),
    CategoriesController.save,
);
catgegoryRoutes.put(
    '/categories/:id',
    celebrate({ [Segments.BODY]: updateCategorySchema }),
    asyncHandler(CategoriesController.update),
);
catgegoryRoutes.delete(
    '/categories/:id',
    asyncHandler(CategoriesController.delete),
);
