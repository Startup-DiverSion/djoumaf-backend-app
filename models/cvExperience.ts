import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Parameter } from "./parameter"
import { Preference } from "./userPreference"
import { Profile } from "./userProfile"
import { User } from "./user"
import { SkillCv } from "./cvSkill"

@Entity("cv_experiences")
export class ExperienceCv {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    slug: string

    @Column()
    company_name: string

    @ManyToOne(() => Parameter, (parameter) => parameter.type_parameter, {onDelete: 'CASCADE',})
    type_contract: Parameter

    @Column()
    date_start: string

    @Column({nullable: true})
    date_finish: string

    @Column({nullable: true, type: 'boolean'})
    currently_working: Boolean

    @Column()
    workplace: string

    @Column({type: 'longtext'})
    description: string

    @OneToMany(() => SkillCv, (sk) => sk.experience, {cascade: true})
    skill: SkillCv[]

    @ManyToOne(() => User, (user) => user.profile, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}