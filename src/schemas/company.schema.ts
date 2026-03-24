import { Joi } from 'celebrate';

export const companySchema = Joi.object().keys({
    logomarca: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required(),
    ),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(
            /(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/,
        )
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativo: Joi.boolean().only().allow(true).default(true),
});

export const updateCompanySchema = Joi.object().keys({
    logomarca: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required(),
    ),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(
            /(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/,
        )
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativo: Joi.boolean().required(),
});
