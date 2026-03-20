import { User } from '../types/user.type.js';
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

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(userId: string): Promise<User> {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return user;
    }

    async save(user: User): Promise<void> {
        const userAuth = await this.authService.create(user);

        user.id = userAuth.uid;

        console.log(userAuth)

        return await this.userRepository.save(user);
    }

    async update(userId: string, user: User): Promise<string> {

        console.log('Dados chegando no serviço: ', user)
        const _user = await this.userRepository.getById(userId);
        if (!_user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        _user.nome = user.nome;
        _user.idade = user.idade;
        _user.id = userId;

        console.log(_user)
        await this.userRepository.update(_user);

        return 'Usuário atualizado com sucesso!';
    }

    async delete(userId: string): Promise<void> {
        return this.userRepository.delete(userId);
    }
}
