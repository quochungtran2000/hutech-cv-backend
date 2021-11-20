import { Column, Entity } from "typeorm";

@Entity()
export class BaseDateTime {
  @Column({ type: Date, default: () => "now()" })
  create_date!: Date;

  @Column({ type: Date, default: () => "now()" })
  update_date!: Date;
}
