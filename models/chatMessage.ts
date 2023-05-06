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
import { User } from './user';
import { ChatMessageGroup } from './chatMessageGroup';


@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'longtext'})
  message: string;

  @Column({default: false})
  view: boolean;

  @ManyToOne(() => User, (user) => user.chat_message_group, {onDelete: 'CASCADE',})
  user: User;

  @ManyToOne(() => ChatMessageGroup, (chat) => chat.name, {onDelete: 'CASCADE',})
  chat_group: ChatMessageGroup;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}