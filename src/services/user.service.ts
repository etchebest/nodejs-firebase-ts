import { User } from '../models/user.model.js';
import { UserRepository } from '../repositories/user.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';
import { AuthService } from './auth.service.js';

export class UserService {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    /**
     * Busca todos os usuários
     * @returns Lista de usuários
     */
    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    /**
     * Busca um usuário pelo id
     * @param userId - Id do usuário
     * @returns Usuário encontrado
     */
    async getById(userId: string): Promise<User> {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return user;
    }

    /**
     * Salva um usuário
     * @param user - Dados do usuário
     * @returns Mensagem de sucesso
     */
    async save(user: User): Promise<void> {
        const userAuth = await this.authService.create(user);

        user.id = userAuth.uid;

        console.log(userAuth);

        return await this.userRepository.save(user);
    }

    /**
     * Atualiza um usuário
     * @param userId - Id do usuário
     * @param user - Dados do usuário
     * @returns Mensagem de sucesso
     */
    async update(userId: string, user: User): Promise<string> {
        console.log('Dados chegando no serviço: ', user);
        const _user = await this.userRepository.getById(userId);
        if (!_user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        _user.nome = user.nome;
        _user.idade = user.idade;
        _user.email = user.email;
        _user.id = userId;

        await this.authService.update(userId, user);
        await this.userRepository.update(_user);

        return 'Usuário atualizado com sucesso!';
    }

    /**
     * Deleta um usuário
     * @param userId - Id do usuário
     * @returns Mensagem de sucesso
     */
    async delete(userId: string): Promise<void> {
        await this.authService.delete(userId);
        await this.userRepository.delete(userId);
    }
}
