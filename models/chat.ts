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
import { TalkMail } from './talkMail';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => User, user => user.chats)
  users: User[];

  @OneToMany(() => TalkMail, (message) => message.chat)
   message: TalkMail;

  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}