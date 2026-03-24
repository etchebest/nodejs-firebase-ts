import { Request, Response } from 'express';
import { Company } from '../models/company.model.js';
import { CompanyService } from '../services/company.service.js';

export class CompaniesController {
    /**
     * Recebe todas as empresas
     * @param req - Requisição
     * @param res - Resposta
     */
    static async getAll(req: Request, res: Response) {
        res.status(200).send(await new CompanyService().getAll());
    }

    /**
     * Recebe uma empresa pelo id
     * @param req - Requisição
     * @param res - Resposta
     */
    static async getById(req: Request, res: Response) {
        const companyId = String(req.params.id);

        res.status(200).send(await new CompanyService().getById(companyId));
    }

    /**
     * Salva uma empresa
     * @param req - Requisição
     * @param res - Resposta
     */
    static async save(req: Request, res: Response) {
        const company: Company = req.body;
        await new CompanyService().save(company);

        res.status(201).send('empresa criada com sucesso!');
    }

    /**
     * Atualiza uma empresa pelo id
     * @param req - Requisição
     * @param res - Resposta
     */
    static async update(req: Request, res: Response) {
        const companyId = String(req.params.id);
        const company = req.body;

        res.status(200).send(
            await new CompanyService().update(companyId, company),
        );
    }
}
