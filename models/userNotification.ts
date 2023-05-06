import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import {Profile} from './userProfile'
import { Parameter } from "./parameter"
import { User } from "./user"
import { TypeParameter } from "./parameterType"


@Entity("user_notifications")
export class Notifications {

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => Parameter, (type) => type.notification, {onDelete: 'CASCADE',})
    notification_type: Parameter

    @ManyToOne(() => User, (user) => user.notifications, {onDelete: 'CASCADE',})
    user: User

    @ManyToOne(() => User, (user) => user.notifications, {onDelete: 'CASCADE',})
    receive: User

    @Column()
    content: String

    @Column({nullable: true})
    objt: String

    @Column()
    redirect: String

    @Column()
    description: String

    @Column({nullable: true})
    provide_id: String

    @Column({default: false})
    distribution: Boolean

    @Column({default: false})
    distribution_all: Boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}