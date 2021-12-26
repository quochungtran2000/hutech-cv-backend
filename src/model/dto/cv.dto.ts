export interface CvDto {
  fullname: string;
  job_title: string;
  current_level: number;
  experience_years: number;
  email: string;
  phone: string;
  date_of_birth: Date;
  city_id: number;
  district_id: number;
  gender: string;
  married: boolean;
  avatar: string;
  address: string;
  summary: string;
  template_id: number;
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
  level: number;
}

export interface CertificateDto {
  name: string;
  organization: string;
  year: string;
  url: string;
}

export interface LoginDto {
  id: string;
  avatar: string;
  email: string;
  name: string;
}

export interface CvProfessionalDto {
  author_id: string;
  codestyle: string;
  image: string;
  create_date: Date;
  update_date: Date;
}

export class CVPRODTO {
  template?: string;
  image_url?: string;
  pdf_url?: string;
  type?: string;
  urlqr?: string;
  level?: string;
  major?: string;
  name?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  author_id?: string;

  public static fromDTO(dto: Partial<CVPRODTO>) {
    const res = new CVPRODTO();
    res.image_url = dto.image_url;
    res.template = dto.template;
    res.pdf_url = dto.pdf_url;
    res.type = dto.type;
    res.urlqr = dto.urlqr;
    res.level = dto.level;
    res.name = dto.name;
    res.major = dto.major;
    res.author_id = dto.author_id;
    res.fullname = dto.fullname;
    res.email = dto.email;
    res.phone = dto.phone;
    return res;
  }
}

export class CvResponse {
  id?: string;
  template?: string;
  image_url?: string;
  pdf_url?: string;
  slug?: string;
  urlqr?: string;
  level?: string;
  major?: string;
  name?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  view?: number;
  create_at?: Date;
  update_at?: Date;

  public static fromEntityToCV(entity: Partial<CvResponse>) {
    const res = new CvResponse();
    res.id = entity.id;
    res.urlqr = entity.urlqr;
    res.level = entity.level;
    res.major = entity.major;
    res.name = entity.name;
    res.template = entity.template;
    res.image_url = entity.image_url;
    res.pdf_url = entity.pdf_url;
    res.slug = entity.slug;
    res.fullname = entity.fullname;
    res.email = entity.email;
    res.phone =  entity.phone;
    res.create_at = entity.create_at;
    res.update_at = entity.update_at;
    return res;
  }

  public static fromEntityToTemplate(entity: Partial<CvResponse>) {
    const res = new CvResponse();
    res.id = entity.id;
    res.template = entity.template;
    res.image_url = entity.image_url;
    res.create_at = entity.create_at;
    res.update_at = entity.update_at;
    return res;
  }
}
