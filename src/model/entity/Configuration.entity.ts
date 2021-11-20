import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  // @OneToMany(() => CV, (cv) => cv.configuration)
  // @JoinColumn({ name: "id", referencedColumnName: "configuration_id" })
  // cv!: CV[];

  // @OneToMany(() => Language, (language) => language.configuration)
  // @JoinColumn({ name: "id", referencedColumnName: "configuration_id" })
  // language!: Language[];
}
