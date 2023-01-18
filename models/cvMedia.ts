import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm"
import { ModelCv } from "./cvModel"


@Entity("cv_medias")
export class MediaCv {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'json'})
    url: JSON

    @OneToMany(() => ModelCv, (cv) => cv.picture, { onDelete: "CASCADE" })
    model_cv: ModelCv

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}