import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Profile } from './userProfile';
import { User } from './user';
import { Talks } from './talks';



@Entity("messages")
export class Message {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'longtext'})
    text: string

    @ManyToOne(() => Talks, (talk) => talk.message, { onDelete: "CASCADE" })
    talk: Talks

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}