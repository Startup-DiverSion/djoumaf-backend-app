import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import {Profile} from "./userProfile"
import { Job } from './jobs';
import { User } from "./user";

@Entity("media_user_profile")
export class Media {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'varchar', nullable: true})
    url: string

    @ManyToOne(() => Profile, (profile) => profile.media_profile, { onDelete: "CASCADE" })
    profile: Profile

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}