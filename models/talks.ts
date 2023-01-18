import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Message } from "./message";
import { Profile } from './userProfile';
import { User } from './user';



@Entity("talks")
export class Talks {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    code: string

    @ManyToMany(() => User) 
    @JoinTable({name: "user_in_talks"})
    user: User

    @OneToMany(() => Message, (message) => message.talk, { onDelete: "CASCADE" })
    message: Message

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}