import {
    OneToMany,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
 } from 'typeorm';
 import { Message } from './talkMessage';
 import { Profile } from './userProfile';
 import { User } from './user';
 import { Chat } from './chat';
import { MediaPost } from './mediaPost';
import { PostUserLike } from './postUserLike';
import { PostUserDjoumer } from './postUserDjoumer';
import { PostComments } from './postComments';
 
 @Entity('posts')
 export class Post {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({})
    slug: string;
 
    @Column({type: 'longtext'})
    description: string;

    @Column({type: 'longtext'})
    place: string;

    @Column({type: 'longtext'})
    device: string;
 
    @ManyToOne((type) => User, (user) => user.post, {onDelete: 'CASCADE',})
    user: User;
 
    @OneToMany(() => MediaPost, (media) => media.media_post, { cascade: true })
    media: MediaPost;

    @OneToMany(() => PostUserLike, (like) => like.post, { cascade: true })
    like: PostUserLike;

    @OneToMany(() => PostUserDjoumer, (djoumer) => djoumer.post, { cascade: true })
    djoumer: PostUserDjoumer;

    @OneToMany(() => PostComments, (comment) => comment.post, { cascade: true })
    comments: PostComments;
 
    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
 
    @DeleteDateColumn()
    deleted_at: Date;
 }
 