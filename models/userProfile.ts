import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Media } from './mediaUserProfile'
import { User } from "./user"
import { Preference } from "./userPreference";
import { Job } from "./jobs";
import { Parameter } from "./parameter";
import { MediaCover } from "./mediaUserProfileCover";


@Entity("user_profiles")
export class Profile {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: true})
    slug: string

    @Column({nullable: true})
    first_name: string

    @Column({ nullable: true})
    last_name: string

    @Column({ nullable: true})
    full_name: string

    @Column({ nullable: true})
    bio: string

    @Column({ nullable: true, type: "longtext"})
    description: string

    @ManyToOne(() => Parameter, (pref) => pref.preference)
    type_user: Parameter
    
    @Column({ nullable: true})
    born: Date

    @Column({ nullable: true})
    sex: string

    @Column({ nullable: false, default: 0})
    lvl: number

    @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
    user: User

    @ManyToMany(() => User) 
    @JoinTable({name: "follow"})
    follow: User

    @OneToMany(() => Job, (job) => job.profile)
    job: Job

    @OneToMany(() => Media, (media) => media.profile)
    media_profile: Media

    @OneToMany(() => MediaCover, (media) => media.profile)
    media_profile_cover: MediaCover

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}