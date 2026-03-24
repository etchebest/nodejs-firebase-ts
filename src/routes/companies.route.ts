import { Router } from 'express';
import { CompaniesController } from '../controllers/companies.controller.js';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { companySchema, updateCompanySchema } from '../schemas/company.schema.js';

export const companiesRoutes = Router();

companiesRoutes.get('/companies', asyncHandler(CompaniesController.getAll));
companiesRoutes.get(
    '/companies/:id',
    asyncHandler(CompaniesController.getById),
);

companiesRoutes.post(
    '/companies',
    celebrate({ [Segments.BODY]: companySchema }),
    CompaniesController.save,
);
companiesRoutes.put(
    '/companies/:id',
    celebrate({ [Segments.BODY]: updateCompanySchema }),
    asyncHandler(CompaniesController.update),
);
