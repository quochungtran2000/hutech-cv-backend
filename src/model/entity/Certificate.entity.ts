import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "certificate" })
export class Certificate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  cv_id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  organization!: string;

  @Column({ nullable: false })
  year!: string;

  @Column({ nullable: false })
  url!: string;

  // @ManyToOne(() => CV, (cv: CV) => cv.certificates)
  // @JoinColumn({ name: "cv_id", referencedColumnName: "id" })
  // cv!: CV;
}
