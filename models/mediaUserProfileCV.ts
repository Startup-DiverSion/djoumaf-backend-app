import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm"
import { ModelCv } from "./cvModel"


@Entity("media_user_profile_cv")
export class MediaCv {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({nullable: true})
    url: string

    @OneToMany(() => ModelCv, (cv) => cv.picture, { onDelete: "CASCADE" })
    model_cv: ModelCv

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}