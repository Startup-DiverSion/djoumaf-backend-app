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

@Entity('talk_mail')
export class TalkMail {
   @PrimaryGeneratedColumn()
   id: Number;

   @Column()
   subject: string;

   @Column()
   from: string;

   @ManyToOne((type) => User, (user) => user.chats)
   user: User;

   @ManyToOne((type) => Chat, (chat) => chat.message)
   chat: Chat;

   @Column()
   message: string;

   @Column()
   sign: string;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @DeleteDateColumn()
   deleted_at: Date;
}
