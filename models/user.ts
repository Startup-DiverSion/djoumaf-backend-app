import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   DeleteDateColumn,
   OneToOne,
   JoinColumn,
   ManyToOne,
   OneToMany,
   JoinTable,
   ManyToMany
} from 'typeorm';
import { Job } from './jobs';
import { Media } from './mediaUserProfile';
import { Preference } from './userPreference';
import { Profile } from './userProfile';
import { Role } from './userRole';
import { ToApplyJob } from './jobToApply';
import { TalkMail } from './talkMail';
import { Chat } from './chat';
import { Follow } from './userFollow';

@Entity('users')
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   username: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column({ type: 'boolean', default: false })
   verify_email: boolean;

   @Column({ nullable: true })
   verify_email_expire: string;

   @Column()
   token: string;

   @OneToOne(() => Profile, (profile) => profile.user, { eager: true, cascade: true, onDelete: 'CASCADE' })
   @JoinColumn()
   profile: Profile;

   @Column({ type: 'longtext', nullable: true })
   signin_place: any;

   @Column({ type: 'longtext', nullable: true })
   signup_place: any;

   @Column({ type: 'longtext', nullable: true })
   device: any;
   

   @ManyToOne(() => Role, (role) => role.user, {onDelete: 'CASCADE',})
   role: Role;

   @OneToMany(() => Preference, (preference) => preference.user, {cascade: true})
   preference: Preference;
   

   @Column({  nullable: true })
   rest_password_code: string;

   @Column({  nullable: true })
   verify_code_expire: string;

   @OneToMany(() => Job, (job) => job.user, {cascade: true})
   job: Job;

   @OneToMany(() => TalkMail, (message) => message.user, {cascade: true})
   message: TalkMail;

   @ManyToMany(type => Chat, chat => chat.users)
  @JoinTable({name: 'chat_into_users'})
  chats: Chat[];

  @ManyToMany(type => Follow, follow => follow.users)
  @JoinTable({name: 'follow_into_users'})
  follows: Follow[];

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @DeleteDateColumn()
   deleted_at: Date;
}
