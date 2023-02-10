import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { TypeParameter } from "./parameterType"
import { Preference } from "./userPreference"
import { Job } from "./jobs"


@Entity("parameters")
export class Parameter {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: false})
    title: string

    @ManyToOne(() => TypeParameter, (type) => type.parameter, {onDelete: 'CASCADE',})
    type_parameter: TypeParameter

    @OneToMany(() => Preference, (preference) => preference.parameter, {cascade: true})
    preference: Preference

    @OneToMany(() => Job, (job) => job.field_activity, {cascade: true})
    job: Job

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}