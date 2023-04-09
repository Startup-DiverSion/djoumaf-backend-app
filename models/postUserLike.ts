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
import { Post } from './posts';
 
 @Entity('post_user_like')
 export class PostUserLike {
    @PrimaryGeneratedColumn()
    id: Number;
 
    @ManyToOne((type) => User, (user) => user.post_liker, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne((type) => Post, (post) => post.like, {onDelete: 'CASCADE'})
    post: Post;
 
    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
 
    @DeleteDateColumn()
    deleted_at: Date;
 }
 