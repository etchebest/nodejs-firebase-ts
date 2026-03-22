import { FirebaseError } from 'firebase/app';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error.js';
import { UnauthorizedError } from '../errors/unauthorized.erro.js';
import { User } from '../types/user.type.js';
import { FirebaseAuthError, getAuth, UserRecord } from 'firebase-admin/auth';
import {
    getAuth as getFirebaseAuth,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth';

export class AuthService {
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
}
