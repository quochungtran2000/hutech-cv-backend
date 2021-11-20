import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  Account,
  Activity,
  Certificate,
  City,
  Configuration,
  District,
  Education,
  Experience,
  Language,
  Skill,
} from ".";

@Entity()
export class Cv {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  fullname!: string;

  @Column({ nullable: false })
  job_title!: string;

  @Column({ nullable: false })
  current_level!: number;

  @Column({ nullable: false })
  experience_years!: number;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  phone!: string;

  @Column({ default: "male" })
  gender!: string;

  @Column({ name: "is_married", default: false })
  married!: boolean;

  @Column({ nullable: true })
  date_of_birth!: Date;

  @Column({ nullable: false })
  city_id!: number;

  @Column({ nullable: false })
  district_id!: number;

  @Column({ nullable: false })
  address!: string;

  @Column({ name: "description", nullable: false })
  summary!: string;

  @Column({ nullable: false })
  template_id!: number;

  @Column({ nullable: false })
  author_id!: string;

  @OneToMany(() => Experience, (workExperience) => workExperience.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  experiences!: Experience[];

  @OneToMany(() => Education, (education) => education.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  educations!: Education[];

  @OneToMany(() => Certificate, (certificate) => certificate.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  certificates!: Certificate[];

  @OneToMany(() => Activity, (activity) => activity.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  activities!: Activity[];

  @OneToMany(() => Skill, (skill) => skill.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  skills!: Skill[];

  @OneToMany(() => Language, (language) => language.cv)
  @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  languages!: Language[];

  @OneToOne(() => City, (city) => city.cv)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city!: City;

  @OneToOne(() => District, (district) => district.cv)
  @JoinColumn({ name: "district_id", referencedColumnName: "id" })
  district!: City;

  @OneToOne(() => Configuration, (config) => config.cv)
  @JoinColumn({ name: "current_level", referencedColumnName: "id" })
  current_job!: Configuration;

  @OneToOne(() => Account, (account) => account.cv)
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author!: Account;
}
