import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import {Profile} from "./userProfile"
import { Job } from './jobs';
import { User } from "./user";
import { Post } from "./posts";

@Entity("media_posts")
export class MediaPost {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'varchar', nullable: true})
    url: string

    @Column({type: 'varchar', nullable: true})
    original_url: string

    @Column({type: 'varchar', nullable: true})
    type: string

    @ManyToOne(() => Post, (post) => post.media, { onDelete: 'CASCADE' })
    media_post: Post

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}