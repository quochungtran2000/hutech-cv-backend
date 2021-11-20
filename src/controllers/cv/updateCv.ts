import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { beforeUpdateCv, getConfig } from "../../helpers/helpers";
import { CvDto } from "../../model/dto/cv.dto";
import {
  Activity,
  Certificate,
  Cv,
  Education,
  Experience,
  Language,
  Skill,
} from "../../model/entity";
import { cvValidation } from "../../validation";

export const updateCv = async (
  req: Request<any, any, CvDto, any>,
  res: Response
) => {
  try {
    const userId = (req as any)?.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized!" });

    const data = req.body;

    const { error } = cvValidation.validate(data);
    if (error) return res.status(400).json({ message: error.message });

    const cv = await getRepository(Cv)
      .createQueryBuilder("cv")
      .where("cv.author_id = :userId")
      .setParameters({ userId })
      .getOne();

    let ref_id: number;

    if (!cv) {
      const result = await createQueryBuilder()
        .insert()
        .into(Cv)
        .values({
          fullname: data.fullname,
          job_title: data.job_title,
          current_level: data.current_level,
          experience_years: data.experience_years,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          city_id: data.city_id,
          district_id: data.district_id,
          address: data.address,
          summary: data.summary,
          template_id: data.template_id,
          author_id: userId,
          married: data.married,
          gender: data.gender
        })
        .returning("*")
        .execute();

      const [insertCv] = result.raw;

      ref_id = insertCv.id;
    } else {
      ref_id = cv.id;

      await getRepository(Cv)
        .createQueryBuilder()
        .update(Cv)
        .set({
          fullname: data.fullname,
          job_title: data.job_title,
          current_level: data.current_level,
          experience_years: data.experience_years,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          city_id: data.city_id,
          district_id: data.district_id,
          address: data.address,
          summary: data.summary,
          template_id: data.template_id,
          author_id: userId,
          married: data.married,
          gender: data.gender
        })
        .where("id = :cvId")
        .setParameters({ cvId: ref_id })
        .execute();

      await beforeUpdateCv(ref_id);
    }

    const {
      experiences = [],
      languages = [],
      educations = [],
      skills = [],
      certificates = [],
      activities = [],
    } = data;
    const todoList: Promise<any>[] = [];

    if (experiences.length) {
      const values: QueryDeepPartialEntity<Experience>[] = [];
      for (const elm of experiences) {
        values.push({
          cv_id: ref_id,
          job_title: elm.job_title,
          company: elm.company,
          from_date: elm.from_date,
          to_date: elm.to_date,
          iscurrent_job: elm.iscurrent_job,
          description: elm.description,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Experience).values(values).execute()
      );
    }

    if (languages.length) {
      const values: QueryDeepPartialEntity<Language>[] = [];
      for (const elm of languages) {
        const config = await getConfig(elm.configuration_id);
        values.push({
          cv_id: ref_id,
          name: elm.name,
          level_vi: config.value_vi,
          level_en: config.value_en,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Language).values(values).execute()
      );
    }

    if (educations.length) {
      const values: QueryDeepPartialEntity<Education>[] = [];
      for (const elm of educations) {
        const config = await getConfig(elm.configuration_id);
        values.push({
          cv_id: ref_id,
          major: elm.major,
          school: elm.school,
          degree_en: config.value_en,
          degree_vi: config.value_vi,
          from_date: elm.from_date,
          to_date: elm.to_date,
          achievement: elm.achievement,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Education).values(values).execute()
      );
    }

    if (skills) {
      const values: QueryDeepPartialEntity<Skill>[] = [];
      for (const elm of skills) {
        values.push({
          cv_id: ref_id,
          name: elm.name,
          level: elm.level,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Skill).values(values).execute()
      );
    }

    if (certificates) {
      const values: QueryDeepPartialEntity<Certificate>[] = [];
      for (const elm of certificates) {
        values.push({
          cv_id: ref_id,
          name: elm.name,
          organization: elm.organization,
          year: elm.year,
          url: elm.url,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Certificate).values(values).execute()
      );
    }

    if (activities) {
      const values: QueryDeepPartialEntity<Activity>[] = [];
      for (const elm of activities) {
        values.push({
          cv_id: ref_id,
          name: elm.name,
          organization: elm.organization,
          role: elm.role,
          description: elm.description,
          from_date: elm.from_date,
          to_date: elm.to_date,
        });
      }
      todoList.push(
        createQueryBuilder().insert().into(Activity).values(values).execute()
      );
    }

    await Promise.all(todoList);

    return res.status(200).json({data});
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
