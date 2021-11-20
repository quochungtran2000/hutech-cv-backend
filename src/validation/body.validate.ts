import Joi from "joi";

export const addTranslationValidation = Joi.object({
  key: Joi.string().required(),
  value_vi: Joi.string().required(),
  value_en: Joi.string().required(),
});
