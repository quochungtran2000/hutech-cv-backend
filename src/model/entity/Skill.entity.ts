import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from ".";

@Entity({ name: "skill" })
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  level!: number;

  @Column()
  cv_id!: number;

  @ManyToOne(() => Cv, (cv) => cv.skills)
  @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  cv!: Cv;
}
