import Joi from "joi";

export const getConfigValidation = Joi.object({
  type: Joi.string().valid(
    "degree",
    "type_of_applicant",
    "languages",
    "skill",
    "current_job"
  ),
  lang: Joi.string().valid("vi", "en").required()
});
