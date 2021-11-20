import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Cv } from ".";
import { District } from "./District.entity";

@Entity()
export class City extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => District, (district) => district.city)
  @JoinColumn({ name: "id", referencedColumnName: "city_id" })
  districts!: District[];

  @OneToOne(() => Cv, (cv) => cv.city)
  @JoinColumn({ name: "id", referencedColumnName: "city_id" })
  cv!: Cv;
}
