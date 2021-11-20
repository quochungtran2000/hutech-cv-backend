import dotEnv from "dotenv";
import { createQueryBuilder, getRepository } from "typeorm";
import {
  Account,
  Activity,
  Certificate,
  Configuration,
  Education,
  Experience,
  Language,
  Skill,
} from "../model/entity";
import jwt from "jsonwebtoken";
import { template } from "./template";
import sgMail from "@sendgrid/mail";
import { SEND_KEY } from "./constants";

dotEnv.config();

export const getEnv = (key: string): string => {
  return process.env[key] || "";
};

export enum DbErrorCode {
  DUPLICATE = 23505,
  RELATION = 23503,
}

export const getConfig = async (id: number): Promise<Configuration> => {
  const result = await getRepository(Configuration)
    .createQueryBuilder()
    .where("id = :id")
    .setParameters({ id })
    .getOne();

  if (!result)
    return Promise.reject({ message: `config id [${id}] not found` });

  return Promise.resolve(result);
};

export const generatorToken = async (user: Account) => {
  return await jwt.sign(
    { userId: user.id, name: user.name, email: user.email },
    "hung",
    {
      algorithm: "HS256",
      subject: `${user.id}`,
      expiresIn: "7d",
    }
  );
};

export const beforeUpdateCv = (id: number): Promise<any> => {
  const language = createQueryBuilder()
    .delete()
    .from(Language)
    .where("cv_id = :id", { id })
    .execute();

  const experience = createQueryBuilder()
    .delete()
    .from(Experience)
    .where("cv_id = :id", { id })
    .execute();

  const education = createQueryBuilder()
    .delete()
    .from(Education)
    .where("cv_id = :id", { id })
    .execute();

  const skill = createQueryBuilder()
    .delete()
    .from(Skill)
    .where("cv_id = :id", { id })
    .execute();

  const certificate = createQueryBuilder()
    .delete()
    .from(Certificate)
    .where("cv_id = :id", { id })
    .execute();

  const activity = createQueryBuilder()
    .delete()
    .from(Activity)
    .where("cv_id = :id", { id })
    .execute();

  return Promise.all([
    language,
    experience,
    education,
    skill,
    certificate,
    activity,
  ]);
};

sgMail.setApiKey(process.env.SEND_KEY || '');

export const sendMail = (to: string, file: any) => {
  const msg = {
    to: to,
    from: "axiosdungchung0@gmail.com",
    subject: "Hutech cv gửi bạn cv",
    text: "Cảm ơn bạn đã sử dụng dịch vụ của Hutech Cv",
    html: template,
    attachments: [
      {
        content: file,
        filename: "cv",
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
