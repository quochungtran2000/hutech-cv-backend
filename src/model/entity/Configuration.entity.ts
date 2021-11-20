import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from ".";

@Entity()
export class Configuration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  level!: number;

  @Column({ nullable: true })
  value_vi!: string;

  @Column({ nullable: true })
  value_en!: string;

  // @OneToMany(() => Education, (education) => education.configuration)
  // @JoinColumn({ name: "id", referencedColumnName: "configuration_id" })
  // education!: Education[];

  // @OneToMany(() => Skill, (skill) => skill.configuration)
  // @JoinColumn({ name: "id", referencedColumnName: "configuration_id" })
  // skill!: Skill[];

  @OneToOne(() => Cv, (cv) => cv.current_job)
  @JoinColumn({ name: "id", referencedColumnName: "current_level" })
  cv!: Cv;

  // @OneToMany(() => Language, (language) => language.configuration)
  // @JoinColumn({ name: "id", referencedColumnName: "configuration_id" })
  // language!: Language[];
}
