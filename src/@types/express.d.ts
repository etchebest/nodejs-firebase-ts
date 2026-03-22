import { User } from '../models/user.model.ts';

// Sobrescreve a interface Request do Express para adicionar o tipo User
declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
