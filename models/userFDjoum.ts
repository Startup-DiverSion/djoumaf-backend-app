import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Media } from './mediaUserProfile'
import { User } from "./user"
import { Preference } from "./userPreference";
import { Job } from "./jobs";


@Entity("user_fdjoum")
export class Djoum {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: false})
    owner: number

    @ManyToMany(type => User, user => user.djoums, {cascade: true})
    users: User[];

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}