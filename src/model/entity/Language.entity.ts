import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv } from ".";

@Entity({ schema: "public", name: "language" })
export class Language extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  level_vi!: string;

  @Column({ nullable: true })
  level_en!: string;

  @Column({ nullable: false })
  cv_id!: number;

  // @Column({ nullable: false })
  // configuration_id!: number;

  @ManyToOne(() => Cv, (cv) => cv.languages)
  @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  cv!: Cv;

  // @ManyToOne(() =>Configuration, (configuration:Configuration ) => configuration.language)
  // @JoinColumn({ name: "configuration_id", referencedColumnName: "id"})
  // configuration!:Configuration;
}
