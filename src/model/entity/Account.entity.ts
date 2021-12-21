import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Cv } from ".";
import { CvProfessional } from "./CvProfessional";

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

  @OneToMany(() => CvProfessional, (cvProfessional) => cvProfessional.author)
  @JoinColumn({ name: "id", referencedColumnName: "author_id" })
  cvProfessional!: CvProfessional[];
}
