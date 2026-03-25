import fs from 'fs';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';
import { fileTypeFromBuffer } from 'file-type';
import { randomUUID } from 'crypto';
import { ValidationError } from '../errors/validation-error.js';

export class UploadService {
    constructor(private path: string = '') {}

    async upload(base64: string): Promise<string> {
        const buffer = Buffer.from(base64, 'base64');
        const fileType = await fileTypeFromBuffer(buffer);
        if (!fileType) {
            throw new ValidationError(
                'A extenção do arquivo não foi reconhecida!',
            );
        }

        const fileName = `${randomUUID().toString()}.${fileType?.ext}`;
        fs.writeFileSync(fileName, buffer);

        const bucket = getStorage().bucket(process.env.FIREBASE_STORAGE_BUCKET);
        const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName,
        });

        fs.unlinkSync(fileName);

        return getDownloadURL(uploadResponse[0]);
    }
}
