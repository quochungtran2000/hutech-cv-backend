export interface CvDto {
  fullname: string;
  job_title: string;
  current_level: string;
  experience_years: number;
  email: string;
  phone: string;
  date_of_birth: Date;
  city_id: number;
  district_id: number;
  address: string;
  description: string;
  template_id: number;
  configuration_id: number;
  author_id: string;
  activities: ActivityDto[];
  experiences: ExperienceDto[];
  educations: EducationDto[];
  skills: SkillDto[];
  languages: LanguageDto[];
  certificates: CertificateDto[];
}

export interface ActivityDto {
  name: string;
  role: string;
  organization: string;
  from_date: Date;
  to_date: Date;
  description: string;
}

export interface ExperienceDto {
  job_title: string;
  company: string;
  from_date: Date;
  to_date: Date;
  iscurrent_job: boolean;
  description: string;
}

export interface EducationDto {
  major: string;
  school: string;
  configuration_id: number;
  from_date: Date;
  to_date: Date;
  achievement: string;
}

export interface SkillDto {
  name: string;
  level: number;
}

export interface LanguageDto {
  name: string;
  configuration_id: number;
}

export interface CertificateDto {
  name: string;
  organization: string;
  year: string;
  url: string;
}
