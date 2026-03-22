import { FirebaseError } from 'firebase/app';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js';
import { UnauthorizedError } from '../errors/unauthorized.erro.js';
import { User } from '../models/user.model.js';
import {
    FirebaseAuthError,
    getAuth,
    UpdateRequest,
    UserRecord,
} from 'firebase-admin/auth';
import {
    getAuth as getFirebaseAuth,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';

/**
 * Classe responsável por autenticação
 */
export class AuthService {
    /**
     * Cria um usuário
     * @param user - Dados do usuário
     */
    async create(user: User): Promise<UserRecord> {
        return getAuth()
            .createUser({
                email: user.email,
                password: user.email,
                displayName: user.nome,
            })
            .catch((err) => {
                if (
                    err instanceof FirebaseAuthError &&
                    err.code === 'auth/email-already-exists'
                ) {
                    throw new EmailAlreadyExistsError();
                }
                throw err;
            });
    }

    /**
     * Atualiza um usuário
     * @param id - Id do usuário
     * @param user - Dados do usuário
     */
    async update(id: string, user: User) {
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email,
        };

        // Se o usuário tiver senha, atualiza
        if (user.password) {
            props.password = user.password;
        }

        await getAuth().updateUser(id, props);
    }

    /**
     * Loga um usuário
     * @param email - Email do usuário
     * @param password - Senha do usuário
     */
    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(
            getFirebaseAuth(),
            email,
            password,
        ).catch((err) => {
            console.log('Dados do erro:', err);

            if (err instanceof FirebaseError) {
                if (err.code == 'auth/invalid-credential') {
                    throw new UnauthorizedError();
                }
            }
            throw err;
        });
    }

    /**
     * Deleta um usuário
     * @param id - Id do usuário
     */
    async delete(id: string) {
        await getAuth().deleteUser(id);
    }

    async recovery(email: string) {
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }
}
