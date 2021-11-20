create table city (
	id integer not null,
	name character varying not null
);

alter table city add constraint city_pkey primary key (id);

create table district (
	id integer not null,
	name character varying not null,
	city_id integer not null
);
alter table district add constraint district_pkey primary key (id);
alter table district add constraint district_fkey_city foreign key (city_id) references city (id);

create sequence skill_id_req;

create table skill (
	id integer default nextval('skill_id_req'::regClass) not null,
	name character varying not null,
	level character varying not null,
	cv_id integer not null
);

alter table skill add constraint skill_pkey primary key (id);

create sequence exprerience_id_req;

create table exprerience (
	id integer default nextval('exprerience_id_req'::regClass) not null,
  	cv_id integer not null,
  	job_title character varying not null,
	company character varying not null,
  	from_date timestamp not null,
  	to_date timestamp not null,
  	iscurrent_job boolean default false,
  	description character varying
);

alter table exprerience add constraint exprerience_pkey primary key (id); 

create sequence education_id_seq;

create table education (
  id integer default nextval('education_id_seq'::regClass) not null,
  cv_id integer not null,
  major character varying not null,
  school character varying not null,
  degree_vi character varying,
  degree_en character varying,
  from_date timestamp not null,
  to_date timestamp not null,
  achievement character varying not null
);

alter table education add constraint education_pkey primary key (id);

create sequence language_id_seq;

create table public.language (
    id integer default nextval('language_id_seq'::regClass) not null,
    name character varying not null,
    level_vi character varying,
    level_en character varying,
    cv_id integer not null
);

alter table public.language add constraint language_pkey primary key (id);


create sequence certificate_id_seq;

create table certificate (
  id integer default nextval('certificate_id_seq') not null,
  cv_id integer not null,
  name character varying not null,
  organization character varying not null,
  year character varying not null,
  url character varying not null
);

alter table certificate add constraint certificate_pkey primary key (id);

create sequence activity_id_seq;

create table activity (
  id integer default nextval('activity_id_seq'::regClass) not null,
  cv_id integer not null,
  name character varying not null,
  role character varying not null,
  organization character varying not null,
  from_date timestamp not null,
  to_date timestamp not null,
  description character varying
);

alter table activity add constraint activity_pkey primary key (id);

create sequence configuration_id_seq;

create table public.configuration (
  id integer default nextval('configuration_id_seq'::regClass) not null,
  name character varying not null,
  level integer,
  value_vi character varying,
  value_en character varying
);

alter table public.configuration add constraint configuration_pkey primary key (id);

create sequence cv_id_seq;

create table cv (
  id integer default nextval('cv_id_seq'::regClass) not null,
  fullname character varying not null,
  job_title character varying not null,
  current_level integer not null,
  experience_years integer not null,
  email character varying not null,
  phone character varying not null,
  date_of_birth timestamp,
  city_id  integer not null,
  district_id  integer not null,
  address character varying not null,
  description character varying,
  template_id  integer not null
);

alter table cv add column create_date timestamp default now();
alter table cv add column update_date timestamp default now();
alter table cv add constraint cv_pkey primary key (id);


create table public.translation (
	key character varying not null,
	value_vn character varying not null,
    value_en character varying not null
);

alter table public.translation add constraint translation_pkey primary key (key);




alter table cv add constraint cv_fkey_city foreign key (city_id) references city (id);
alter table cv add constraint cv_fkey_district foreign key (district_id) references district (id);
alter table cv add constraint cv_fkey_configuration foreign key (current_level) references public.configuration (id);


alter table exprerience  add constraint experience_fkey_cv foreign key (cv_id) references cv (id);
alter table education add constraint education_fkey_cv foreign key (cv_id) references cv (id);
alter table certificate add constraint certificate_fkey_cv foreign key (cv_id) references cv (id);
alter table activity add constraint activity_fkey_cv foreign key (cv_id) references cv (id);
alter table skill add constraint skill_fkey_cv foreign key (cv_id) references cv (id);
alter table public.language add constraint language_fkey_cv foreign key (cv_id) references cv (id);
