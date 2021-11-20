import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "education" })
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  cv_id!: number;

  @Column({ nullable: false })
  major!: string;

  @Column({ nullable: false })
  school!: string;

  @Column({ nullable: true })
  degree_vi!: string;

  @Column({ nullable: true })
  degree_en!: string;

  @Column({ nullable: false })
  configuration_id!: number;

  @Column({ type: Date, nullable: false })
  from_date?: Date;

  @Column({ type: Date, nullable: false })
  to_date?: Date;

  @Column({ nullable: false })
  achievement!: string;

  // @ManyToOne(() => CV, (cv: CV) => cv.educations)
  // @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  // cv!: CV;

  // @ManyToOne(() => Configuration, (config) => config.education)
  // @JoinColumn({ name: "configuration_id", referencedColumnName: "id" })
  // configuration!: Configuration;
}
