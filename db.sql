create table city (
	id integer not null,
	name character not null
);

alter table city add constraint city_pkey primary key (id);

create table district (
	id integer not null,
	name character not null,
	city_id integer not null
);
alter table district add constraint district_pkey primary key (id);
alter table district add constraint district_fkey_city foreign key (city_id) references city (id);

create sequence skill_id_req;

create table skill (
	id integer default nextval('skill_id_req'::regClass) not null,
	name character not null,
	level character not null,
	cv_id integer not null,
	configuration_id integer not null
);

alter table skill add constraint skill_pkey primary key (id);

create sequence exprerience_id_req;

create table exprerience (
	id integer default nextval('exprerience_id_req'::regClass) not null,
  	cv_id integer not null,
  	job_title character not null,
	company character not null,
  	from_date timestamp not null,
  	to_date timestamp not null,
  	iscurrent_job boolean default false,
  	description character
);

alter table exprerience add constraint exprerience_pkey primary key (id); 

create sequence education_id_seq;

create table education (
  id integer default nextval('education_id_seq'::regClass) not null,
  cv_id integer not null,
  major character not null,
  school character not null,
  degree_vi character,
  degree_en character,
  configuration_id integer not null,
  from_date timestamp not null,
  to_date timestamp not null,
  achievement character not null
);

alter table education add constraint education_pkey primary key (id);

create sequence language_id_seq;

create table public.language (
    id integer default nextval('language_id_seq'::regClass) not null,
    name character not null,
    level_vi character,
    level_en character,
    cv_id integer not null,
    configuration_id integer not null
);

alter table public.language add constraint language_pkey primary key (id);

create table certificate (
  id integer default nextval('certificate_id_seq') not null,
  cv_id integer not null,
  name character not null,
  organization character not null,
  year character not null,
  url character not null
);

alter table certificate add constraint certificate_pkey primary key (id);


create table activity (
  id integer default nextval('activity_id_seq'::regClass) not null,
  cv_id integer not null,
  name character not null,
  role character not null,
  organization character not null,
  from_date timestamp not null,
  to_date timestamp not null,
  description character
);

alter table activity add constraint activity_pkey primary key (id);

create sequence configuration_id_seq;

create table public.configuration (
  id integer default nextval('configuration_id_seq'::regClass) not null,
  name character not null,
  level integer not null,
  value_vi character,
  value_en character
);

alter table public.configuration add constraint configuration_pkey primary key (id);

create sequence cv_id_seq;

create table cv (
  id integer default nextval('cv_id_seq'::regClass) not null,
  fullname character not null,
  job_title character not null,
  current_level character not null,
  experience_years integer not null,
  email character not null,
  phone character not null,
  date_of_birth timestamp,
  city_id  integer not null,
  district_id  integer not null,
  address character not null,
  description character,
  template_id  integer not null,
  configuration_id integer not null
);

alter table cv add column create_date timestamp default now();
alter table cv add column update_date timestamp default now();
alter table cv add constraint cv_pkey primary key (id);