import { Joi } from 'celebrate';

export const userSchemaLogin = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const userSchemaRecovery = Joi.object().keys({
    email: Joi.string().email().required(),
});

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
