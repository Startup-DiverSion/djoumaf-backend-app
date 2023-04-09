import { OneToMany, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Media } from './mediaUserProfile'
import { User } from "./user"
import { Preference } from "./userPreference";
import { Job } from "./jobs";


@Entity("user_roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: true})
    slug: string

    @Column({nullable: false})
    name: string

    @OneToMany(() => User, (user) => user.role, {cascade: true})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}