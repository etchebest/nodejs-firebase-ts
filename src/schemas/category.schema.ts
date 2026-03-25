import { Joi } from 'celebrate';

export const categorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativo: Joi.boolean().only().allow(true).default(true),
});

export const updateCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativo: Joi.boolean().required(),
});
