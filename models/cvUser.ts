import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm"
import { MediaCv } from "./mediaUserProfileCV"
import { ModelCv } from "./cvModel"
import { User } from "./user"


@Entity("cv_user")
export class UserCv {

    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'integer'})
    cv_default: number

    @ManyToOne(() => ModelCv, (cv) => cv.user_cv, {onDelete: 'CASCADE',})
    model_cv: ModelCv

    @ManyToOne(() => User, (user) => user.profile, {onDelete: 'CASCADE',})
    user: User

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

}