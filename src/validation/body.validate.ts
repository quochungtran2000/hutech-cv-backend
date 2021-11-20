import Joi from "joi";

export const addTranslationValidation = Joi.object({
  key: Joi.string().required(),
  value_vi: Joi.string().required(),
  value_en: Joi.string().required(),
});

export const cvExperience = Joi.object({
  job_title: Joi.string().required(),
  company: Joi.string().required(),
  from_date: Joi.date().required(),
  to_date: Joi.string().required(),
  iscurrent_job: Joi.boolean().default(false),
  description: Joi.string().required(),
});

export const cvEducation = Joi.object({
  major: Joi.string().required(),
  school: Joi.string().required(),
  configuration_id: Joi.number().required(),
  from_date: Joi.date().required(),
  to_date: Joi.date().required(),
  achievement: Joi.string().required(),
});

export const cvSkill = Joi.object({
  name: Joi.string().required(),
  level: Joi.number().required().valid(1, 2, 3, 4, 5),
});

export const cvLanguage = Joi.object({
  name: Joi.string().required(),
  configuration_id: Joi.number().required(),
});

export const cvCertificate = Joi.object({
  name: Joi.string().required(),
  organization: Joi.string().required(),
  year: Joi.string().required(),
  url: Joi.string().default("").allow(""),
});

export const cvActivity = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  organization: Joi.string().required(),
  from_date: Joi.date().required(),
  to_date: Joi.date().required(),
  description: Joi.string(),
});

export const cvValidation = Joi.object({
  fullname: Joi.string().required(),
  job_title: Joi.string().required(),
  current_level: Joi.number(),
  experience_years: Joi.number().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  date_of_birth: Joi.date().required(),
  city_id: Joi.number().required(),
  district_id: Joi.number().required(),
  address: Joi.string().required(),
  summary: Joi.string().required(),
  template_id: Joi.number().required(),
  author_id: Joi.string().required(),
  activities: Joi.array().items(cvActivity),
  certificates: Joi.array().items(cvCertificate),
  languages: Joi.array().items(cvLanguage),
  skills: Joi.array().items(cvSkill),
  educations: Joi.array().items(cvEducation),
  experiences: Joi.array().items(cvExperience),
});
