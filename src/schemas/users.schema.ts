import { Joi } from 'celebrate';

export const userSchemaPost = Joi.object().keys({
    nome: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    idade: Joi.number().integer().required(),
});

export const userSchemaUpdate = Joi.object().keys({
    nome: Joi.string(),
    idade: Joi.number().integer(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});
