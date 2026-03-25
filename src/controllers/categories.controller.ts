import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service.js';
import { Category } from '../models/category.model.js';

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.status(200).send(await new CategoryService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const companyId = String(req.params.id);

        res.status(200).send(await new CategoryService().getById(companyId));
    }

    static async save(req: Request, res: Response) {
        const category: Category = req.body;
        await new CategoryService().save(category);

        res.status(201).send('categoria criada com sucesso!');
    }

    static async update(req: Request, res: Response) {
        const categoryId = String(req.params.id);
        const category = req.body;

        res.status(200).send(
            await new CategoryService().update(categoryId, category),
        );
    }

    static async delete(req: Request, res: Response) {
        const categoryId = String(req.params.id);
        await new CategoryService().delete(categoryId);

        res.status(204).end();
    }
}
