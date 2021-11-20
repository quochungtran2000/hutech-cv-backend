import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Translation {
  @PrimaryColumn()
  key!: string;

  @Column({name: 'value_vn', nullable: false })
  value_vi!: string;

  @Column({ nullable: false })
  value_en!: string;
}
