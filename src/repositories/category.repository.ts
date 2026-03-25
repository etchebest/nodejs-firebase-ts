import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { Category } from '../models/category.model.js';

export class CategoryRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('categories');
    }

    async getAll(): Promise<Category[]> {
        const snapshot = await this.collection.get();

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as Category[];
    }

    async getById(companyId: string): Promise<Category | null> {
        const doc = await this.collection.doc(companyId).get();
        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data(),
        } as Category;
    }

    async save(category: Category): Promise<void> {
        await this.collection.add({ ...category });
    }

    async update(category: Category): Promise<void> {
        const docRef = this.collection.doc(category.id!);

        delete category.id;

        await docRef.set({
            descricao: category.descricao,
            ativo: category.ativo,
        });
    }

    async delete(categoryId: string): Promise<void> {
        await this.collection.doc(categoryId).delete();
    }
}
