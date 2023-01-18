import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne,OneToMany} from "typeorm"
import { MediaCv } from "./cvMedia"
import { UserCv } from "./cvUser"


@Entity("cv_models")
export class ModelCv {

    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    title: string

    @Column()
    slug: string

    @ManyToOne(() => MediaCv, (cv) => cv.model_cv, { onDelete: "CASCADE" })
    picture: MediaCv

    @OneToMany(() => UserCv, (cv) => cv.model_cv, { onDelete: "CASCADE" })
    user_cv: UserCv

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}