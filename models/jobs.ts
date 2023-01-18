import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,JoinTable, DeleteDateColumn,ManyToMany, ManyToOne, OneToMany } from "typeorm"
import {Profile} from "./userProfile"
import { User } from "./user";
import { Parameter } from "./parameter";
import { ToApplyJob } from "./jobToApply";


@Entity("jobs")
export class Job {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    title: string

    @ManyToOne(() => Parameter, (type) => type.job)
    field_activity: Parameter

    @ManyToOne(() => Parameter, (type) => type.job)
    work_place: Parameter

    @ManyToOne(() => Parameter, (type) => type.job)
    contract_type: Parameter

    @Column()
    slug: string

    @Column({type: 'json'})
    localization: JSON

    @Column()
    dead_line: Date

    @Column({type: 'longtext'})
    description: any

    @ManyToOne(() => User, (user) => user.job)
    user: Profile

    @ManyToOne(() => Profile, (profile) => profile.job)
    profile: Profile

    @OneToMany(() => ToApplyJob, apply => apply.job)
    to_apply: ToApplyJob

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}