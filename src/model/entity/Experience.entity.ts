import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from ".";

@Entity({ schema: "public", name: "exprerience" })
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  cv_id!: number;

  @Column({ nullable: false })
  job_title!: string;

  @Column({ nullable: false })
  company!: string;

  @Column({ type: Date, nullable: false })
  from_date!: Date;

  @Column({ type: Date, nullable: false })
  to_date!: Date;

  @Column({ default: false, nullable: true })
  iscurrent_job!: boolean;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => Cv, (cv) => cv.experiences)
  @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  cv!: Cv;
}
