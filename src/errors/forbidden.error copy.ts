import { ErrorBase } from './base.error.js';

export class Forbidden extends ErrorBase {
    constructor(message = 'Não autorizado') {
        super(403, message);
    }
}
