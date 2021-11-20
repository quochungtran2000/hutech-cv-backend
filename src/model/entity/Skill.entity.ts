import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "skill" })
export class Skill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  level!: string;

  @Column()
  cv_id!: number;

  @Column()
  configuration_id!: number;
}
