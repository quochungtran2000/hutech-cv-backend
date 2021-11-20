import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
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

  // @OneToOne(() => CV, (cv: CV) => cv.city)
  // @JoinColumn({ name: "id", referencedColumnName: "city_id" })
  // cv: CV;
}
