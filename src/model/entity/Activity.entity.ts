import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from ".";

@Entity({ name: "activity" })
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  cv_id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  role!: string;

  @Column({ nullable: false })
  organization!: string;

  @Column({ nullable: false, type: Date })
  from_date!: Date;

  @Column({ nullable: false, type: Date })
  to_date!: Date;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => Cv, (cv) => cv.activities)
  @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  cv!: Cv;
}
