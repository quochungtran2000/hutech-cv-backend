import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Cv } from ".";

@Entity({ name: "account" })
export class Account {
  @PrimaryColumn()
  id!: string;

  @Column()
  avatar!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @OneToOne(() => Cv, (cv) => cv.author)
  @JoinColumn({ name: "id", referencedColumnName: "author_id" })
  cv!: Cv;
}
