import { User } from '../types/user.type.js';
import { UserRepository } from '../repositories/user.repository.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
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
        return this.userRepository.save(user);
    }

    async update(userId: string, user: User): Promise<string> {
        const _user = await this.userRepository.getById(userId);
        if (!_user) {
            throw new NotFoundError('Usuário não encontrado.');
        }

        _user.nome = user.nome;
        _user.email = user.email;
        _user.idade = user.idade;

        this.userRepository.update(_user);
        
        return 'Usuário atualizado com sucesso!';
    }

    async delete(userId: string): Promise<void> {
        return this.userRepository.delete(userId);
    }
}
