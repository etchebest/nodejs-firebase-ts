import { Joi } from 'celebrate';

export const userSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    idade: Joi.number().integer().required(),
});
