import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { Company } from '../models/company.model.js';

export class CompanyRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection('companies');
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get();

        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as unknown as Company[];
    }

    async getById(companyId: string): Promise<Company | null> {
        const doc = await this.collection.doc(companyId).get();
        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data(),
        } as unknown as Company;
    }

    async save(company: Company): Promise<void> {
        await this.collection.add({ ...company });
    }

    async update(company: Company): Promise<void> {
        const docRef = this.collection.doc(company.id!);
        delete company.id;
        await docRef.set({ ...company });
    }
}
