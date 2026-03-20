import { User } from '../types/user.type.js';
import { getAuth, UserRecord } from 'firebase-admin/auth';

export class AuthService {
    create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.email,
            displayName: user.nome,
        });
    }
}
