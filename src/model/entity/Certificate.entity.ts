import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from "./Cv.entity";

@Entity({ name: "certificate" })
export class Certificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  cv_id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  organization!: string;

  @Column({ nullable: false })
  year!: string;

  @Column({ nullable: false })
  url!: string;

  @ManyToOne(() => Cv, (cv) => cv.certificates)
  @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  cv!: Cv;
}
