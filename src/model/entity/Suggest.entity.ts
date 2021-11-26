import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "suggest" })
export class Suggest {
  @PrimaryColumn()
  type!: string;

  @Column({ type: "text", nullable: false })
  content!: string;
}
