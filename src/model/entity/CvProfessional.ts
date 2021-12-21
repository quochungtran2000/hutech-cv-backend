import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from ".";

@Entity({name:"cvprofessional"})
export class CvProfessional{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({ nullable: false })
    author_id!: string;

    @Column({ nullable: false })
    codestyle!: string;

    @Column({})
    image!: string;

    @Column({})
    create_date!: Date;

    @Column({})
    update_date!: Date;

    @ManyToOne(() => Account, (account) => account.cvProfessional)
    @JoinColumn({ name: "author_id", referencedColumnName: "id" })
    author!: Account;

}