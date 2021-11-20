import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cv extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  fullname!: string;

  @Column({ nullable: false })
  job_title!: string;

  @Column({ nullable: false })
  current_level!: string;

  @Column({ nullable: false })
  experience_years!: number;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  phone!: string;

  @Column({ nullable: true })
  date_of_birth!: Date;

  @Column({ nullable: false })
  city_id!: number;

  @Column({ nullable: false })
  district_id!: number;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  description!: string;

  @Column({ nullable: false })
  template_id!: number;

  @Column({ nullable: false })
  configuration_id!: number;

  // @OneToMany(() => Experience, (workExperience) => workExperience.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // experiences: Experience[];

  // @OneToMany(() => Education, (education) => education.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // educations: Education[];

  // @OneToMany(() => Certificate, (certificate) => certificate.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // certificates: Certificate[];

  // @OneToMany(() => Activity, (activity) => activity.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // activities: Activity[];

  // @OneToMany(() => Skill, (skill) => skill.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // skills: Skill[];

  // @OneToMany(() => Language, (language) => language.cv)
  // @JoinColumn({ name: "id", referencedColumnName: "cv_id" })
  // languages: Language[];

  // @OneToOne(() => City, (city) => city.cv)
  // @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  // city: City;

  // @OneToOne(() => District, (district) => district.cv)
  // @JoinColumn({ name: "district_id", referencedColumnName: "id" })
  // district: City;

  // @ManyToOne(() => Configuration, (config) => config.cv)
  // @JoinColumn({ name: "configuration_id", referencedColumnName: "id" })
  // configuration: Configuration;
}
