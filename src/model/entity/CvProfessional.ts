import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from ".";

@Entity({ name: "cvprofessional" })
export class CvProfessional {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  author_id!: string;

  @Column({})
  template!: string;

  @Column({})
  image_url!: string;

  @Column({})
  pdf_url!: string;

  @Column({})
  slug!: string;

  @Column({})
  type!: string;

  @Column({})
  public!: boolean;

  @Column({})
  create_date!: Date;

  @Column({})
  update_date!: Date;

  @ManyToOne(() => Account, (account) => account.cvProfessional)
  @JoinColumn({ name: "author_id", referencedColumnName: "id" })
  author!: Account;
}
