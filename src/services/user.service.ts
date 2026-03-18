import { getFirestore } from 'firebase-admin/firestore';
import { User } from '../types/user.type.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class UserService {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection('users').get();

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as unknown as User[];
    }

    async getById(userId: string): Promise<User> {
        const doc = await getFirestore().collection('users').doc(userId).get();

        if (!doc.exists) {
            throw new NotFoundError('Usuário não encontrado');
        }

        return {
            id: doc.id,
            ...doc.data(),
        } as unknown as User;
    }

    async save(user: User): Promise<void> {
        const userSave = await getFirestore()
            .collection('users')
            .add({ ...user });
    }

    async update(userId: string, user: User): Promise<string> {
        const docRef = getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email,
                idade: user.idade,
            });
            return 'Usuário atualizado com sucesso!';
        } else {
            throw new NotFoundError('Usuário não encontrado.');
        }
    }

    async delete(userId: string): Promise<void> {
        await getFirestore().collection('users').doc(userId).delete();
    }
}
