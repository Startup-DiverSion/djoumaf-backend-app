import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { Parameter } from "./parameter"
import { Preference } from "./userPreference"

@Entity("parameter_types")
export class TypeParameter {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: true})
    slug: string

    @Column()
    title: string

    @OneToMany(() => Parameter, (parameter) => parameter.type_parameter, {cascade: true})
    parameter: Parameter

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}