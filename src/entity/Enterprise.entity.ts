import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('TBL_MTR_ENTERPRISE')
export class Enterprise extends BaseEntity{
    @PrimaryGeneratedColumn()
    idEnterprise: number;

    @Column()
    name: string;

    @Column()
    documentType: string;

    @Column()
    documentNumber: string;

    @Column({nullable: true})
    verifier: string;
}