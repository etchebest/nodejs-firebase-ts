import { ErrorBase } from './base.error.js';

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(
        message = 'O e-mail informado já esta sendo utilizado por outra conta!',
    ) {
        super(409, message);
    }
}
