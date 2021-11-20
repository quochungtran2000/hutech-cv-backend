import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Cv } from ".";
import { City } from "./City.entity";

@Entity({ name: "district" })
export class District extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  city_id!: string;

  @ManyToOne(() => City, (city) => city.districts)
  @JoinColumn({ name: "city_id", referencedColumnName: "id" })
  city!: City;

  @OneToOne(() => Cv, (cv) => cv.district)
  @JoinColumn({ name: "id", referencedColumnName: "district_id" })
  cv!: Cv;
}
