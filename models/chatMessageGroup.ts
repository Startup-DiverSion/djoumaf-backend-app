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
import { ChatMessage } from './chatMessage';

@Entity()
export class ChatMessageGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.chat_message_group, {onDelete: 'CASCADE',})
  userEmit: User;

  @ManyToOne(() => User, (user) => user.chat_message_group, {onDelete: 'CASCADE',})
  userOn: User;

  @OneToMany(() => ChatMessage, (chat_message) => chat_message.chat_group, {cascade: true})
  message: ChatMessage;

  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}