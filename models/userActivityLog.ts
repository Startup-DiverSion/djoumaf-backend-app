import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Message } from "./talkMessage";
import { Profile } from './userProfile';
import { User } from './user';
import { Parameter } from './parameter';



@Entity("user_activity_log")
export class ActivityLog {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    source: string

    @Column()
    title: string

    @Column()
    tag: string

    @Column()
    source_id: Number

    @ManyToOne(() => Parameter, (params) => params.activity_log, {onDelete: 'CASCADE',})
    log_status: Parameter

    @ManyToOne(() => User, (user) => user.activity_log, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}