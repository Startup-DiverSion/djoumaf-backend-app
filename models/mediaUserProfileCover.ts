import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import {Profile} from "./userProfile"
import { Job } from './jobs';
import { User } from "./user";

@Entity("media_user_profile_cover")
export class MediaCover {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'json', nullable: true})
    url: object

    @ManyToOne(() => Profile, (profile) => profile.media_profile_cover, { onDelete: "CASCADE" })
    profile: Profile

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}