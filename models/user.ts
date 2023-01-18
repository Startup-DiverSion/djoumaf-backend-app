import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { Job } from './jobs';
import { Media } from "./mediaUserProfile";
import { Preference } from "./userPreference";
import { Profile } from "./userProfile";
import { Role } from "./userRole";
import { ToApplyJob } from "./jobToApply";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({ type: 'boolean', default: false })
    verify_email: boolean

    @Column({nullable: true})
    verify_email_expire: string

    @Column()
    token: string

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile

    @Column({type: "json", nullable: true})
    signin_place: object

    @Column({type: "json", nullable: true})
    signup_place: object

    @Column({type: "json", nullable: true})
    device: object

    @ManyToOne(() => Role, (role) => role.user)
    role: Role

    @OneToMany(() => Preference, (preference) => preference.user)
    preference: Preference

    @Column({type: "json", nullable: true})
    rest_password_code: object

    @OneToMany(() => Job, (job) => job.user)
    job: Job

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}