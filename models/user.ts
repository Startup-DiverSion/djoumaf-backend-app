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
   ManyToMany,
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
import { ExperienceCv } from './cvExperience';
import { CourseCV } from './cvCourse';
import { ActivityLog } from './userActivityLog';
import { MediaPost } from './mediaPost';
import { Post } from './posts';
import { PostUserLike } from './postUserLike';
import { PostComments } from './postComments';
import { ChatMessageGroup } from './chatMessageGroup';
import { Notifications } from './userNotification';
import { Djoum } from './userFDjoum';

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

   @OneToOne(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
   @JoinColumn()
   profile: Profile;

   @Column({ type: 'longtext', nullable: true })
   signin_place: any;

   @Column({ type: 'longtext', nullable: true })
   signup_place: any;

   @Column({ type: 'longtext', nullable: true })
   device: any;

   @ManyToOne(() => Role, (role) => role.user, { onDelete: 'CASCADE' })
   role: Role;

   @OneToMany(() => Preference, (preference) => preference.user, {
      cascade: true,
   })
   preference: Preference;

   @OneToMany(() => ExperienceCv, (exp) => exp.user, { cascade: true })
   experience: ExperienceCv;

   @OneToMany(() => CourseCV, (course) => course.user, { cascade: true })
   course: CourseCV;

   @OneToMany(() => ActivityLog, (log) => log.user, { cascade: true })
   activity_log: ActivityLog;

   @Column({ nullable: true })
   rest_password_code: string;

   @Column({ nullable: true })
   verify_code_expire: string;

   @OneToMany(() => Job, (job) => job.user, { cascade: true })
   job: Job;

   @OneToMany(() => TalkMail, (message) => message.user, { cascade: true })
   message: TalkMail;

   @OneToMany(() => Post, (post) => post.user, { cascade: true })
   post: Post;

   @OneToMany(() => PostUserLike, (post) => post.user, { cascade: true })
   post_liker: PostUserLike;

   @OneToMany(() => PostUserLike, (post) => post.user, { cascade: true })
   post_djoumer: PostUserLike;

   @OneToMany(() => PostComments, (comment) => comment.user, { cascade: true })
   post_comment: PostComments;

   @ManyToMany((type) => Chat, (chat) => chat.users)
   @JoinTable({ name: 'chat_into_users' })
   chats: Chat[];

   @OneToMany(() => ChatMessageGroup, (message) => message.userEmit, {
      cascade: true,
   })
   chat_message_group: ChatMessageGroup;


   @OneToMany(() => Notifications, (notif) => notif.user, {
      cascade: true,
   })
   notifications: Notifications[];

   @ManyToMany((type) => Follow, (follow) => follow.users)
   @JoinTable({ name: 'follow_into_users' })
   follows: Follow[];

   @ManyToMany((type) => Djoum, (djoum) => djoum.users)
   @JoinTable({ name: 'fdjoum_into_users' })
   djoums: Djoum[];

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @DeleteDateColumn()
   deleted_at: Date;
}
