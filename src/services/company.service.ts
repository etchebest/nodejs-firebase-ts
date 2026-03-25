import { NotFoundError } from '../errors/not-found.error.js';
import { ValidationError } from '../errors/validation-error.js';
import { Company } from '../models/company.model.js';
import { CompanyRepository } from '../repositories/company.repository.js';
import { UploadService } from './upload.service.js';

export class CompanyService {
    private companyRepository: CompanyRepository;
    private uploadService: UploadService;

    constructor() {
        this.companyRepository = new CompanyRepository();
        this.uploadService = new UploadService('images/companies/');
    }

    /**
     * Busca todas as empresas
     * @returns Lista de empresas
     */
    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    /**
     * Busca uma empresa pelo id
     * @param companyId - Id da empresa
     * @returns Empresa encontrada
     */
    async getById(companyId: string): Promise<Company> {
        const company = await this.companyRepository.getById(companyId);

        if (!company) {
            throw new NotFoundError('Empresa não encontrada');
        }

        return company;
    }

    /**
     * Salva uma empresa
     * @param company - Dados da empresa
     * @returns Mensagem de sucesso
     */
    async save(company: Company): Promise<void> {
        const logomarcaUrl = await this.uploadService.upload(company.logomarca);

        company.logomarca = logomarcaUrl;

        return await this.companyRepository.save(company);
    }

    /**
     * Atualiza uma empresa
     * @param companyId - Id da empresa
     * @param company - Dados da empresa
     * @returns Mensagem de sucesso
     */
    async update(id: string, company: Company): Promise<string> {
        const _company = await this.getById(id);

        if (!this.isValidUrl(company.logomarca)) {
            _company.logomarca = await this.uploadService.upload(
                company.logomarca,
            );
        }
        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativo = company.ativo;

        await this.companyRepository.update(_company);

        return 'Empresa atualizada com sucesso!';
    }

    private isValidUrl(urlStr: string): boolean {
        try {
            const url = new URL(urlStr);

            console.log(url);

            if (url.host !== 'firebasestorage.googleapis.com') {
                throw new ValidationError('URL de origem inválida!');
            }

            return true;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error;
            }

            return false;
        }
    }
}
