import { ManyToOne, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import {Profile} from './userProfile'
import { Parameter } from "./parameter"
import { User } from "./user"
import { TypeParameter } from "./parameterType"


@Entity("user_preferences")
export class Preference {

    @PrimaryGeneratedColumn()
    id: Number

    @ManyToOne(() => Parameter, (type) => type.preference, {onDelete: 'CASCADE',})
    parameter: Parameter[]

    @ManyToOne(() => TypeParameter, (type) => type.parameter, {onDelete: 'CASCADE',})
    parent: TypeParameter

    @ManyToOne(() => User, (type) => type.preference, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}