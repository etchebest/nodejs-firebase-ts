import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { User } from '../types/user.type.js';
import { NotFoundError } from '../errors/not-found.error.js';

export class UserRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('users');
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as unknown as User[];
    }

    async getById(userId: string): Promise<User | null> {
        const doc = await this.collection.doc(userId).get();
        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data(),
        } as unknown as User;
    }

    async save(user: User): Promise<void> {
        delete user.password;

        console.log(user)

        const userSave = await this.collection.doc(user.id).set({ ...user });
    }

    async update(user: User): Promise<void> {
        const docRef = this.collection.doc(user.id);

        await docRef.set({ ...user});
    }

    async delete(userId: string): Promise<void> {
        await this.collection.doc(userId).delete();
    }
}
