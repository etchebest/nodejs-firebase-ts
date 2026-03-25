import { NotFoundError } from '../errors/not-found.error.js';
import { Category } from '../models/category.model.js';
import { CategoryRepository } from '../repositories/category.repository.js';

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }

    async getById(companyId: string): Promise<Category> {
        const company = await this.categoryRepository.getById(companyId);

        if (!company) {
            throw new NotFoundError('Categoria não encontrada');
        }

        return company;
    }

    async save(category: Category): Promise<void> {
        return await this.categoryRepository.save(category);
    }

    async update(id: string, category: Category): Promise<void> {
        const _category = await this.getById(id);

        _category.descricao = category.descricao;
        _category.ativo = category.ativo;

        await this.categoryRepository.update(_category);
    }

    async delete(categoryId: string): Promise<void> {
        await this.categoryRepository.delete(categoryId);
    }
}
