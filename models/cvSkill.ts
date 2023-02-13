import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Parameter } from "./parameter"
import { Preference } from "./userPreference"
import { Profile } from "./userProfile"
import { User } from "./user"
import { TypeParameter } from './parameterType';
import { ExperienceCv } from "./cvExperience"

@Entity("cv_skills")
export class SkillCv {

    @PrimaryGeneratedColumn()
    id: Number


    @ManyToOne(() => Parameter, (type) => type.preference, {onDelete: 'CASCADE',})
    parameter: Parameter[]

    @ManyToOne(() => TypeParameter, (type) => type.parameter, {onDelete: 'CASCADE',})
    parent: TypeParameter

    @ManyToOne(() => User, (type) => type.preference, {onDelete: 'CASCADE',})
    user: User

    @ManyToOne(() => ExperienceCv, (type) => type.skill, {onDelete: 'CASCADE',})
    experience: ExperienceCv


    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}